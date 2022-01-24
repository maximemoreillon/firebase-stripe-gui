<template>
  <v-card>
    <v-card-title>Account</v-card-title>

    <v-card-text
      v-if="!user">
      You must be logged in to view this page
    </v-card-text>

    <template v-else>
      <v-card-text v-if="stripe_role">
        Subscription: {{stripe_role}}
      </v-card-text>

      <v-card-text>
        <UserPayments />
      </v-card-text>

      <v-card-text>
        <UserSubscriptions />
      </v-card-text>
    </template>





  </v-card>
</template>

<script>

import UserPayments from '@/components/UserPayments.vue'
import UserSubscriptions from '@/components/UserSubscriptions.vue'


import { firestore } from '@/db.js'
import { getAuth } from "firebase/auth"
import {
  collection,
  doc,
  getDocs,
} from "firebase/firestore"


export default {
  name: 'Account',
  components: {
    UserPayments,
    UserSubscriptions
  },
  data(){
    return {
      loading: false,
      payments: [],
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Amount', value: 'amount'},
        {text: 'Currency', value: 'currency'},
      ],
      stripe_role: null,
    }
  },
  mounted(){
    this.get_products()
    this.get_user_stripe_role()

  },
  watch: {
    user(){
      this.get_products()
      this.get_user_stripe_role()
    }
  },
  methods: {

    async get_user_stripe_role(){
      if(!this.user) return
      const auth = getAuth()
      const currentUser = auth.currentUser
      await currentUser.getIdToken(true)
      const decodedToken = await currentUser.getIdTokenResult()
      this.stripe_role = decodedToken.claims.stripeRole
    },


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
