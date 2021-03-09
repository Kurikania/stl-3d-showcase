<template>
  <v-container class="text-center">
    <v-row style="margin-top: 30px" justify="center"> 
    <v-card
      class="ma-2"
      max-width="320"
      v-for="model in data"
      :key="model._id"
    >
      <v-img :src="model.coverImage" />
      <v-card-title>{{model.title}}</v-card-title>
       <v-card-text class="text--primary">
      <div>{{model.description}}</div>
      <v-card-actions>
       <nuxt-link :to="`/models/recent/${model._id}`">
      <v-btn
        color="primary"
      >
        See more
      </v-btn>
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
    };
  },
  async fetch() {
    const res = await this.$axios.get("api/models");
    this.data = res.data;
  },
  methods: {},
};
</script> 