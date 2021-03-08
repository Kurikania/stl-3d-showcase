<template>
  <v-container class="text-center">
    <v-row>
      <h1>My models</h1>
    </v-row>
    <v-row>
      <v-card
        class="ma-2"
        max-width="400"
        v-for="model in data"
        :key="model._id"
      >
        <v-img :src="model.coverImage" />
        <v-card-title>{{ model.title }}</v-card-title>
        <v-card-text class="text--primary">
          <div>{{ model.description }}</div>
          <v-card-actions>
            <v-btn color="primary"> Delete </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  async fetch() {
      console.log( {authorID: this.$auth.$state.user._id, username: this.$auth.user.full_name})
    const res = await this.$axios.get(`api/models/mymodels/${this.$auth.$state.user._id},${this.$auth.user.full_name}`);
    this.data = res.data;
  },
};
</script>