<template>
  <v-data-table
    :loading="loading"
    :items="subscriptions"
    :headers="headers">

    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Subscriptions</v-toolbar-title>
      </v-toolbar>
    </template>

  </v-data-table>
</template>

<script>

import { firestore } from '@/db.js'
import {
  collection,
  doc,
  getDocs,
} from "firebase/firestore"

export default {
  name: 'UserSubscriptions',
  props: {
  },
  mounted(){
    this.get_subscriptions()

  },
  watch: {
    user(){
      this.get_subscriptions()
    }
  },
  data: () => ({
    loading: false,
    subscriptions: [],
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Status', value: 'data.status'},
      {text: 'Role', value: 'data.role'},
    ]

  }),
  methods: {

    async get_subscriptions(){
      if(!this.user) return
      this.loading = true
      try {
        const customersCollectionRef = collection(firestore, 'customers')
        const customerDocRef = doc(customersCollectionRef, this.user.uid)
        const subscriptionsCollectionRef = collection(customerDocRef, 'subscriptions')
        const querySnapshot = await getDocs(subscriptionsCollectionRef)
        this.subscriptions = querySnapshot.docs.map( doc => ({id: doc.id, data: doc.data()}) )
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loading = false
      }

    },
  },
  computed: {
    user(){
      return this.$store.state.user
    }
  }
}
</script>
