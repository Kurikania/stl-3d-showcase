<template>
    <v-container class="text-center">
      <v-row :align="'center'"
             :justify="'center'" class="mt-12">
        <v-col cols="12" md="6" lg="3">
          <authentication-form button-title="Log in" :form.sync="form"></authentication-form>
        </v-col>
      </v-row>
      <snack-bar :snackbar-message.sync="snackbarMessage"></snack-bar>
    </v-container>
</template>

<script>

import AuthenticationForm from '@/components/login-form'
import SnackBar from '@/components/snackBar'

export default {
  components: { AuthenticationForm, SnackBar },
  data: () => ({
    form: {
      hasName: false,
      valid: false,
      email: '',
      password: '',
      finish: false
    },
    snackbarMessage: '',
  }),
  computed: {
    finish () {
      return this.form.finish
    }
  },
  watch: {
    finish (newVal) {
      if (newVal) {
        this.login()
        this.form.finish = false
      }
    }
  },
  methods: {
    async login () {
      console.log(this.$axios.defaults.baseURL)
      try {
       const response = await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        this.snackbarMessage = response.data.message
      } catch (error) {
        console.log(error)
        this.snackbar = true
        this.snackbarMessage = error.response.data.message
      }
    }
  }
}
</script>