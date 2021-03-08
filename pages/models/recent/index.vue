<template>
  <v-container class="text-center">
    <v-card
      class="mx-auto"
      max-width="400"
      v-for="model in data"
      :key="model._id"
    >
      <v-img :src="model.coverImage" />
      <v-card-title>{{model.title}}</v-card-title>
      <!-- <Demo :src="model.model" />  -->
       <v-card-text class="text--primary">
      <div>{{model.description}}</div>
      <v-card-actions>
      <v-btn
        color="orange"
        text
      >
       <nuxt-link :to="`/models/recent/${model._id}`">
        See more
       </nuxt-link>
      </v-btn>
      </v-card-actions>
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Demo from "../../../components/demo-block";
export default {
  components: {
    Demo,
  },
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