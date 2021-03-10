<template>
  <v-container class="text-center">
    <v-card class="mx-auto" max-width="600" >
      <v-card-title>Account info</v-card-title>
      <v-row align="center">
        <v-col>
          <v-card-text class="text--primary">
            <div>{{ $auth.user.full_name }}</div>
            <div>{{ $auth.user.email }}</div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>