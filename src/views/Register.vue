<template>
  <v-card
    max-width="500px"
    class="mx-auto">

    <v-toolbar flat>
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>


    <v-card-text>
      <!-- Todo; validation -->
      <v-form @submit.prevent="register()">
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
        <v-row>
          <v-col>
            <v-text-field
              type="password"
              v-model="password_confirm"
              label="Password confirm" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              :loading="loading"
              type="submit">
              <v-icon>mdi-plus</v-icon>
              <span class="ml-2">Register</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
            Already have an account? Login <router-link :to="{ name: 'login'}">here</router-link>
          </v-col>
        </v-row>
        <v-row v-if="error">
          <v-col class="error">{{error}}</v-col>
        </v-row>
      </v-form>

    </v-card-text>

  </v-card>
</template>

<script>
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"

export default {
  name: 'Register',
  components: {

  },
  data(){
    return {
      email: null,
      password: null,
      password_confirm: null,
      error: null,
      loading: false,
    }
  },
  methods: {
    register(){
      this.loading = true
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(data => {
        console.log(data)
        this.$router.push({name: 'account'})
      })
      .catch(error => {
        console.log('herte');
        console.error(error)
        this.error = error
      })
      .finally( () => { this.loading = false })

    }
  }



}
</script>
