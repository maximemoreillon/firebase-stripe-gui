<template>
  <v-card
    max-width="500px"
    class="mx-auto">

    <v-card-title>Login</v-card-title>
    <template v-if="user">
      <v-card-text>
        <v-row justify="center">
          <v-col cols="auto">
            Logged in as {{user.email}}
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              @click="logout()">
              <v-icon>mdi-logout</v-icon>
              <span class="ml-2">Logout</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </template>

    <template v-else>
      <v-card-text>
        <v-form @submit.prevent="login()">
          <v-row>
            <v-col>
              <v-text-field
                type="email"
                v-model="email"
                label="E-mail" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                type="password"
                v-model="password"
                label="Password" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn
                :loading="logging_in"
                type="submit">
                <v-icon>mdi-login</v-icon>
                <span class="ml-2">Login</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              No account? Register <router-link :to="{ name: 'register'}">here</router-link>
            </v-col>
          </v-row>
          <v-row v-if="error">
            <v-col class="error">
              {{error}}
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </template>

  </v-card>
</template>

<script>
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut
} from "firebase/auth"

export default {
  name: 'Register',
  data(){
    return {
      email: null,
      password: null,
      error: null,
      logging_in: false,
    }
  },
  methods: {
    async login(){

      this.logging_in = true
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, this.email, this.password)
      }
      catch (e) {
        alert(e)
        console.error(e);
      }
      finally {
        this.logging_in = false
      }

    },
    async logout(){
      const auth = getAuth()
      await signOut(auth)
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    }
  }
}
</script>
