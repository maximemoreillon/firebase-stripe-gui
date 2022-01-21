<template>
  <v-card
    max-width="500px"
    class="mx-auto">

    <v-toolbar flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>


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
              :loading="loading"
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

  </v-card>
</template>

<script>
import {signInWithEmailAndPassword, getAuth} from "firebase/auth"

export default {
  name: 'Register',
  components: {

  },
  data(){
    return {
      email: null,
      password: null,
      error: null,
      loading: false,
    }
  },
  methods: {
    login(){
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password)
      .then(data => {
        console.log(data)
        this.$router.push({name: 'account'})
      })
      .catch(error => {
        console.error(error)
        this.error = error
      })
      .finally( () => { this.loading = false })


    }
  }
}
</script>
