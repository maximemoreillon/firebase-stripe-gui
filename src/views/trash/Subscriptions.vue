<template>
  <v-card
    :loading="loading">


    <v-card-title>Subscriptions</v-card-title>

    <v-card-text>
      <v-data-table
        :items="subscriptions"
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
import {getAuth} from "firebase/auth"


export default {
  name: 'subscriptions',
  components: {

  },
  data(){
    return {
      loading: false,
      subscriptions: [],
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Status', value: 'data.status'},
        {text: 'Role', value: 'data.role'},
      ]
    }
  },
  mounted(){
    this.get_subscriptions()
    this.get_user_stuff()

  },
  watch: {
    user(){
      this.get_subscriptions()
    }
  },
  methods: {

    async get_user_stuff(){
      const auth = getAuth()
      const currentUser = auth.currentUser
      await currentUser.getIdToken(true)
      const decodedToken = await currentUser.getIdTokenResult()
      console.log(decodedToken.claims.stripeRole);
    },


    async get_subscriptions(){
      if(!this.user) return
      this.loading = true
      try {
        const customersCollectionRef = collection(firestore, 'customers')
        const customerDocRef = doc(customersCollectionRef, this.user.uid)
        const subscriptionsCollectionRef = collection(customerDocRef, 'subscriptions')
        const querySnapshot = await getDocs(subscriptionsCollectionRef)
        this.subscriptions = querySnapshot.docs.map( doc => ({id: doc.id, data: doc.data()}) )
        console.log(this.subscriptions);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false
      }

    },
    row_clicked({id}){
      this.$router.push({name: 'subscription', params: {subscription_id: id}})
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    }
  }


}
</script>
