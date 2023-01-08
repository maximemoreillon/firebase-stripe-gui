<template>
  <v-card :loading="loading">
    <template v-if="product">
      <v-toolbar flat>
        <v-row align="center">
          <v-col cols="auto">
            <v-btn icon exact :to="{ name: 'products' }">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>{{ product.description }}</v-card-subtitle>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-card-text>
        <v-card :loading="prices_loading" outlined>
          <v-card-title>Price plans</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="auto"
                v-for="(price, index) in prices"
                :key="`price_${index}`"
              >
                <PricePreview :price="price" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </template>

    <v-card-text v-else>Error querying item</v-card-text>
  </v-card>
</template>

<script>
import { firestore } from "@/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

import PricePreview from "@/components/PricePreview.vue"

export default {
  name: "Products",
  components: {
    PricePreview,
  },
  data() {
    return {
      product: null,
      loading: false,
      prices: [],
      prices_loading: false,
    }
  },
  mounted() {
    this.get_product()
    this.get_prices()
  },
  watch: {
    user() {
      this.get_product()
      this.get_prices()
    },
  },
  methods: {
    async get_product() {
      if (!this.user) return
      this.loading = true
      try {
        const collectionRef = collection(firestore, "products")
        const docRef = doc(collectionRef, this.product_id)
        const querySnapshot = await getDoc(docRef)
        this.product = querySnapshot.data()
      } catch (e) {
        console.error(e)
        alert("Failed to get product data")
      } finally {
        this.loading = false
      }
    },

    async get_prices() {
      if (!this.user) return
      this.loading = true
      try {
        const productsCollectionRef = collection(firestore, "products")
        const docRef = doc(productsCollectionRef, this.product_id)
        const PricesCollectionRef = collection(docRef, "prices")
        const querySnapshot = await getDocs(PricesCollectionRef)
        this.prices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      } catch (e) {
        console.error(e)
        alert("Failed to get prices")
      } finally {
        this.loading = false
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
  },
}
</script>
