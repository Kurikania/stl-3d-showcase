<template>
  <v-container class="text-center">
    <v-card
      class="mx-auto" 
      max-width="600"
    >
      
      <v-card-title>{{data.title}}</v-card-title>
      <Demo :src="data.model" /> 
       <v-card-text class="text--primary">
      <div>{{data.description}}</div>
      <v-card-actions>
            <v-text-field
            v-model="post"
            required
          ></v-text-field>
      <v-btn
        color="orange"
        text
        @click="addPost"
      > Add new comment
      </v-btn>
      </v-card-actions>
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Demo from "../../../../components/demo-block";
export default {
  components: {
    Demo,
  },
  data() {
    return {
      data: [],
      comments:[],
      post: ''
    };
  },
  methods: {
    async addPost() {
      let newPost = {
        authorID: this.$auth.$state.user._id,
        authorUsername: this.$auth.user.full_name,
        comment: this.post,
        model: this.data._id
      }
      try {
        await this.$axios.post("api/comments", newPost);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async fetch() {
    const res = await this.$axios.get(`api/models/${this.$route.params.id}`);
    this.data = res.data;
  },
};
</script> 