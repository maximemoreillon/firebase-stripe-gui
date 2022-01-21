<template>
  <v-card
    :loading="loading">

    <template v-if="product">
      <v-card-title>{{product.name}}</v-card-title>
      <v-card-text>{{product.description}}</v-card-text>
    </template>

    <v-card-text class="text-h6">Price plans</v-card-text>

    <v-card-text>
      <v-row>
        <v-col
          cols="auto"
          v-for="(price, index) in prices"
          :key="`price_${index}`">
          <PricePreview
            :price="price"/>
        </v-col>
      </v-row>
    </v-card-text>



  </v-card>
</template>

<script>

import { firestore } from '@/db.js'
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore"

import PricePreview from '@/components/PricePreview.vue'

export default {
  name: 'Products',
  components: {
    PricePreview
  },
  data(){
    return {
      product: null,
      loading: false,
      prices: [],
      prices_loading: false,
      prices_headers: [
        {text: 'Currency', value: 'data.currency'},
        {text: 'Interval', value: 'data.interval'},
        {text: 'Price per interval', value: 'data.unit_amount'},
      ]

    }
  },
  mounted(){
    this.get_product()
    this.get_prices()
  },
  watch: {
    user(){
      this.get_product()
      this.get_prices()
    }
  },
  methods: {


    async get_product(){
      if(!this.user) return
      this.loading = true
      try {
        const collectionRef = collection(firestore, "products")
        const docRef = doc(collectionRef,this.product_id)
        const querySnapshot = await getDoc(docRef)
        this.product = querySnapshot.data()
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false
      }

    },
    async get_prices(){
      if(!this.user) return
      this.loading = true
      try {
        const productsCollectionRef = collection(firestore, "products")
        const docRef = doc(productsCollectionRef,this.product_id)
        const PricesCollectionRef = collection(docRef, 'prices')
        const querySnapshot = await getDocs(PricesCollectionRef)
        this.prices = querySnapshot.docs.map( doc => ({id: doc.id, data: doc.data() }) )
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false
      }

    },
    row_clicked({id}){
      this.$router.push({
        name: 'price',
        params: {
          product_id: this.product_id,
          price_id: id
        }
      })
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    product_id(){
      return this.$route.params.product_id
    }
  }


}
</script>
