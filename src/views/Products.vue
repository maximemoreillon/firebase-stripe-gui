<template>
  <v-card
    :loading="loading">


    <v-card-title>Products</v-card-title>

    <v-card-text>
      <v-row justify="space-around">
        <v-col
          cols="auto"
          v-for="(product, index) in filtered_products"
          :key="`product_${index}`">
          <ProductPreview
            :product="product"/>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text
      v-if="!user">
      You must be logged in to view this page
    </v-card-text>



  </v-card>
</template>

<script>

import { firestore } from '@/db.js'
import {
  collection,
  getDocs,
} from "firebase/firestore"

import ProductPreview from '@/components/ProductPreview.vue'

export default {
  name: 'Products',
  components: {
    ProductPreview
  },
  data(){
    return {
      loading: false,
      products: [],
    }
  },
  mounted(){
    this.get_products()
  },
  watch: {
    user(){
      this.get_products()
    }
  },
  methods: {


    async get_products(){
      if(!this.user) return
      this.loading = true
      try {
        const collectionRef = collection(firestore, "products")
        const querySnapshot = await getDocs(collectionRef)
        this.products = querySnapshot.docs.map( doc => ({id: doc.id, data: doc.data() }) )
        console.log(this.products);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false
      }

    },
    row_clicked({id}){
      this.$router.push({name: 'product', params: {product_id: id}})
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    filtered_products(){
      return this.products.filter( p => p.data.active)
    }
  }


}
</script>
