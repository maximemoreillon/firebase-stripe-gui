<template>
  <v-card :loading="loading" width="250" @click="checkout()" hover>
    <v-card-title class="justify-center">
      {{ price.data.currency.toUpperCase() }} {{ price.data.unit_amount }}
      {{ price.data.type === "one_time" ? "" : ` / ${price.data.interval}` }}
    </v-card-title>
  </v-card>
</template>

<script>
import { firestore } from "@/firebase"
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore"

export default {
  name: "PricePreview",
  props: {
    price: Object,
  },
  data: () => ({
    loading: false,
  }),

  methods: {
    async checkout() {
      this.loading = true

      const checkoutSession = {
        collect_shipping_address: false,
        line_items: this.lineItems,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
        mode: this.mode,
      }

      try {
        const customersCollectionRef = collection(firestore, "customers")
        const customerDocRef = doc(customersCollectionRef, this.user.uid)
        const checkoutSessionsCollectionRef = collection(
          customerDocRef,
          "checkout_sessions"
        )

        const newDoc = await addDoc(
          checkoutSessionsCollectionRef,
          checkoutSession
        )
        const checkoutDocRef = doc(checkoutSessionsCollectionRef, newDoc.id)

        // Wait for checkout URL to be generated server-side
        onSnapshot(checkoutDocRef, (doc) => {
          const { url } = doc.data()
          if (url) window.location.assign(url)
        })
      } catch (e) {
        console.error(e)
        alert("Payment failed")
        this.loading = false
      } finally {
        //this.loading = false
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    product_id() {
      return this.$route.params.product_id
    },
    lineItems() {
      return [{ price: this.price.id, quantity: 1 }]
    },
    mode() {
      if (this.price.data.type === "one_time") return "payment"
      else return "subscription"
    },
  },
}
</script>
