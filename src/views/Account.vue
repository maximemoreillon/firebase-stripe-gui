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

import { getAuth } from "firebase/auth"


export default {
  name: 'Account',
  components: {
    UserPayments,
    UserSubscriptions
  },
  data(){
    return {
      stripe_role: null,
    }
  },
  mounted(){
    this.get_user_stripe_role()

  },
  watch: {
    user(){
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

  },
  computed: {
    user(){
      return this.$store.state.user
    }
  }


}
</script>
