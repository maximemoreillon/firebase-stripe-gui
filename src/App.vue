<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="#444444"
      dark>

      <v-app-bar-nav-icon @click="drawer = !drawer" />


      <v-toolbar-title>Firebase + Stripe + Vue</v-toolbar-title>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      clipped
      app>

      <v-list>
        <v-list-item
          v-for="(item, index) in nav"
          :key="`nav_item_${index}`"
          :to="item.to"
          exact>

          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>


    </v-navigation-drawer>


    <v-main class="grey lighten-4">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import {onAuthStateChanged, getAuth} from "firebase/auth"

export default {
  name: 'App',
  data: () => ({
    drawer: null,
    nav: [
      {title: 'Home', icon: 'mdi-home', to: {name: 'home'}},
      {title: 'Login', icon: 'mdi-login', to: {name: 'login'}},
      {title: 'Register', icon: 'mdi-plus', to: {name: 'register'}},
      // {title: 'Account', icon: 'mdi-account', to: {name: 'account'}},
      {title: 'Products', icon: 'mdi-cart', to: {name: 'products'}},

    ],
  }),
  mounted(){
    const auth = getAuth()
    onAuthStateChanged(auth, user => { this.$store.commit('set_user',user) })
  }
};
</script>
