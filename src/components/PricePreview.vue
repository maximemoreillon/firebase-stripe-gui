<template>
  <v-card
    :loading="loading"
    width="200"
    @click="checkout()">

    <v-card-title>
      {{price.data.currency}} {{price.data.unit_amount}} {{price.data.type === "one_time" ? '' : ` /${price.data.interval}`}}
    </v-card-title>


  </v-card>
</template>

<script>
import { firestore } from '@/db.js'
import {
  collection,
  doc,
  addDoc,
  onSnapshot
} from "firebase/firestore"

export default {
  name: 'PricePreview',
  props: {
    price: Object,
  },
  data: () => ({
    loading: false,
  }),

  methods: {
    async checkout () {

      this.loading = true

      const checkoutSession = {
        collect_shipping_address: false,
        line_items: this.lineItems,
        success_url: `${location.protocol}//${location.host}/success`,
        cancel_url: `${location.protocol}//${location.host}/cancel`,
        mode: this.mode,
      };

      console.log(this.price);

      try {
        const customersCollectionRef = collection(firestore, 'customers')
        const customerDocRef = doc(customersCollectionRef, this.user.uid)
        const checkoutSessionsCollectionRef = collection(customerDocRef, 'checkout_sessions')

        const newDoc = await addDoc(checkoutSessionsCollectionRef, checkoutSession)
        const checkoutDocRef = doc(checkoutSessionsCollectionRef, newDoc.id)

        // Wait for checkotu URL to be generated server-side
        onSnapshot(checkoutDocRef, (doc) => {
          const {url} = doc.data()
          if(url) window.location.assign(url);
          this.loading = false
        });
      }
      catch (e) {
        console.error(e);
        this.loading = false
      }
      finally {
        //this.loading = false
      }







    },
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    product_id(){
      return this.$route.params.product_id
    },

    lineItems() {
      return [{price: this.price.id, quantity: 1}]
    },
    mode(){
      if(this.price.data.type === 'one_time') return 'payment'
      else return 'subscription'
    }
  }

}
</script>
