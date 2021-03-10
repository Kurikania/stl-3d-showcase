<template>
  <v-container class="text-center">
      <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-row style="margin-top: 20px" justify="center" v-if="$auth.$state.user">
        <v-card class="ma-2 pa-3" max-width="320" @click="($nuxt.$router.replace({ path: '/models/new'}))">          
          <v-icon x-large color="blue darken-2"> mdi-plus </v-icon>  Add new model
        </v-card>
      </v-row> 
    <v-row style="margin-top: 20px" justify="center">
      <v-card
        class="ma-2"
        max-width="320"
        v-for="model in data"
        :key="model._id"
      >
        <v-img :src="model.coverImage" />
        <v-card-title>{{ model.title }}</v-card-title>
        <v-card-text class="text--primary">
          <div>{{ model.description }}</div>
          <div>author: {{ model.author.username }}</div>
          <v-card-actions>
            <nuxt-link :to="`/models/recent/${model._id}`">
              <v-btn color="primary"> See more </v-btn>
            </nuxt-link>
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
      isLoading: false,
    };
  },
  async fetch() {
     this.isLoading = true;
    const res = await this.$axios.get("api/models");
    this.data = res.data;
     this.isLoading = false;
  },
  methods: {},
};
</script> 