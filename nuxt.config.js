//import colors from 'vuetify/es5/util/colors'
const colors = require('vuetify/es5/util/colors') 

module.exports = { 
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - final-project',
    title: 'final-project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // enables Nuxt Axios module
    '@nuxtjs/auth',
  ],

  serverMiddleware: [
    '~/api/index.js'
],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.default.blue.darken2,
          accent: colors.default.grey.darken3,
          secondary: colors.default.amber.darken3,
          info: colors.default.teal.lighten1,
          warning: colors.default.amber.base,
          error: colors.default.deepOrange.accent4,
          success: colors.default.green.accent3
        }
      }
    }
  },
  // axios: {
  //   baseURL: "/",
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  auth: {
    strategies: {
		local: {
			endpoints: {
				// these are the API endpoints we created in Express
				login: {
					url: '/api/users/login',
					method: 'post',
					propertyName: 'token'
				},
				logout: true,
				user: {
					url: '/api/users/user',
					method: 'get',
					propertyName: 'user'
				}
			},
			tokenRequired: true,
			tokenType: "Bearer"
		}
    },
    redirect: {
		  login: '/user/login', // User will be redirected to this path if login is required
		  logout: '/', // User will be redirected to this path if after logout, current route is protected
		  home: '/' // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
},
}



