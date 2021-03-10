<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-content>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$auth.loggedIn" to="/models/new" router exact>
          <v-list-item-content>
            <v-list-item-title>Add new model</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/models/recent" router exact>
          <v-list-item-content>
            <v-list-item-title>Recent Models</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span
        v-if="$auth.loggedIn"       
      >
        <v-icon medium color="blue darken-2"  @click="$nuxt.$router.replace({ path: '/profile' })">
          mdi-account-circle-outline
        </v-icon>
        {{ $auth.user.full_name }}
        <nuxt-link to="/profile/logout" style="text-decoration: none ">
          <v-icon medium color="blue darken-2"> mdi-logout-variant </v-icon>
        </nuxt-link>
      </span>
      <span v-else>
        <nuxt-link to="/login"> Login </nuxt-link> /
        <nuxt-link to="/register"> Register </nuxt-link>
      </span>
    </v-app-bar>
    <v-main class="bg">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-apps",
          title: "Login",
          to: "/login",
        },
        {
          icon: "mdi-apps",
          title: "Register",
          to: "/register",
        },
      ],
      title: "stl-3d-showcase",
    };
  },
};
</script>
<style>
.container {
  padding: 0px !important;
  width: 100vw !important;
  max-width: 100vw !important;
}
::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #b1cfd6;
  border-left: 1px solid #a1bdf3;
}

::-webkit-scrollbar-thumb {
  background: #bcd1e9;
  border: solid 3px #98c0fd;
  border-radius: 7px;
}
::-webkit-scrollbar-thumb:hover {
  background: white;
}

.bg {
  background-image: url("/blue-low-poly-background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(255, 255, 255);
}
</style>