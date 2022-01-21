<template>
  <v-card
    :loading="loading">


    <v-card-title>Payments</v-card-title>

    <v-card-text>
      <v-data-table
        :items="payments"
        :headers="headers"></v-data-table>
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
  doc,
  getDocs,
} from "firebase/firestore"


export default {
  name: 'Products',
  components: {

  },
  data(){
    return {
      loading: false,
      payments: [],
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Amount', value: 'amount'},
        {text: 'Currency', value: 'currency'},
      ]
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
        const customersCollectionRef = collection(firestore, "customers")
        const customerDocRef = doc(customersCollectionRef, this.user.uid)
        const paymentsCollectionRef = collection(customerDocRef, "payments")
        const querySnapshot = await getDocs(paymentsCollectionRef)
        this.payments = querySnapshot.docs.map( doc => doc.data() )
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
    }
  }


}
</script>
