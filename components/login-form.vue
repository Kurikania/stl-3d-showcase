<template>
<v-card class="mx-auto pa-6" >
  <v-form
    ref="form"
    v-model="form.valid"
    lazy-validation
  >
    <v-text-field
      v-model="form.full_name"
      :rules="nameRules"
      label="Full name"
      required
      v-if="form.hasName"
    ></v-text-field>

    <v-text-field
      v-model="form.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :counter="20"
      :rules="passwordRules"
      :type="'password'"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!form.valid"
      color="indigo lighten-1"
      class="mr-4"
      @click="validate"
    >
      {{ buttonTitle }}
    </v-btn>
  </v-form>
</v-card>
</template>

<script>
export default {
  name: 'authenticationForm',
  data: () => ({
    nameRules: [
      v => !!v || 'Name is required',      
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 20) || 'Password must be less than 20 characters',
    ]
  }),
  props: {
    form: {
      required: true,
    },
    buttonTitle: {
      required: true
    },
  },
  mounted () {
  this.form.valid = false
    },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.form.finish = true
        this.$emit('update:form', this.form)
      }
    }
  }
}
</script>
