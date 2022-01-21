<template>
  <v-card>

    <template v-if="product">
      <v-card-title>{{product.name}}</v-card-title>
      <v-card-text>{{product.description}}</v-card-text>
    </template>

    <template v-if="price">
      <v-card-text >
        {{price.currency}} {{price.unit_amount}} / {{price.type === "one_time" ? '' : price.interval}}
      </v-card-text>

      <v-card-text>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              color="primary"
              @click="checkout()">
              Checkout
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </template>





  </v-card>
</template>

<script>
import { firestore } from '@/db.js'
import {
  collection,
  doc,
  getDoc,
  addDoc,
  onSnapshot
} from "firebase/firestore"

export default {
  name: 'Price',

  data(){
    return {
      publishableKey: process.env.VUE_APP_STRIPE_PK,
      successURL: `${location.protocol}//${location.host}/success`,
      cancelURL: `${location.protocol}//${location.host}/cancel`,

      product: null,
      product_loading: false,
      price: null,
      price_loading: false,



    }
  },
  mounted(){
    this.get_price()
    this.get_product()
  },
  watch: {
    user(){
      this.get_price()
      this.get_product()
    }
  },
  methods: {


    async get_price(){
      if(!this.user) return
      this.loading = true
      try {
        const collectionRef = collection(firestore, "products")
        const productDocRef = doc(collectionRef,this.product_id)
        const pricesCollectionRef = collection(productDocRef, 'prices')
        const priceDocRef = doc(pricesCollectionRef,this.price_id)
        const querySnapshot = await getDoc(priceDocRef)
        this.price = querySnapshot.data()
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false
      }

    },
    async get_product(){
      if(!this.user) return
      this.loading = true
      try {
        const productsCollectionRef = collection(firestore, "products")
        const docRef = doc(productsCollectionRef,this.product_id)
        const querySnapshot = await getDoc(docRef)
        this.product = querySnapshot.data()
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false
      }

    },
    async checkout () {

      const checkoutSession = {
        collect_shipping_address: false,
        line_items: this.lineItems,
        success_url: this.successURL,
        cancel_url: this.cancelURL,
        mode: this.mode,
      };

      const customersCollectionRef = collection(firestore, 'customers')
      const customerDocRef = doc(customersCollectionRef, this.user.uid)
      const checkoutSessionsCollectionRef = collection(customerDocRef, 'checkout_sessions')

      const newDoc = await addDoc(checkoutSessionsCollectionRef, checkoutSession)
      const checkoutDocRef = doc(checkoutSessionsCollectionRef, newDoc.id)

      // Wait for checkotu URL to be generated server-side
      onSnapshot(checkoutDocRef, (doc) => {
        const {url} = doc.data()
        if(url) window.location.assign(url);
      });



    },
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    product_id(){
      return this.$route.params.product_id
    },
    price_id(){
      return this.$route.params.price_id
    },
    lineItems() {
      return [{price: this.price_id, quantity: 1}]
    },
    mode(){
      if(this.price.type === 'one_time') return 'payment'
      else return 'subscription'
    }
  }


}
</script>
