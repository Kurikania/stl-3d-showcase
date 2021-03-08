<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-content>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/models/new" router exact>
          <v-list-item-content v-if="$auth.loggedIn">
            <v-list-item-title>Add new model</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/models/recent" router exact>
          <v-list-item-content v-if="$auth.loggedIn">
            <v-list-item-title>Recent Models</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span v-if="$auth.loggedIn"> 
        <nuxt-link to="/profile">  Profile </nuxt-link>
        <nuxt-link to="/profile/logout" >Logout</nuxt-link>
      </span>
      <span v-else> 
        <nuxt-link to="/login"> Login </nuxt-link>
        <nuxt-link to="/register"> Register </nuxt-link>
      </span>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-apps',
          title: 'Register',
          to: '/register'
        }
      ],
      title: '3d sharing'
    }
  }
}
</script>
