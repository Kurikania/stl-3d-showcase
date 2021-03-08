<template>
  <v-container class="text-center">
    <v-card class="mx-auto" max-width="600">
      <v-card-title>{{ data.title }}</v-card-title>
      <v-row align="center">
        <v-col>
          <Demo :src="data.model" />
          <v-card-text class="text--primary">
            <div>{{ data.description }}</div>
            <v-btn
              dark
              color="red"
              v-if="data.author.id == currentId"
              @click="deleteModel(data._id)"
            >
              Delete
            </v-btn>
            <h4>Comments section</h4>
            <v-card-actions>
              <v-text-field v-model="post" required></v-text-field>
              <v-btn color="primary" @click="addPost"> Add new comment </v-btn>
            </v-card-actions>
          </v-card-text>
          <v-list-item v-for="comment in data.comments" :key="comment._id">
            <v-list-item-content>
              <v-list-item-title
                >{{ comment.comment }}
                <span
                  class="delete"
                  @click="remove(comment._id)"
                  v-if="comment.author.id == currentId"
                  >[X]</span
                >
              </v-list-item-title>
              <p class="text-end">by - {{ comment.author.username }}</p>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
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
      comments: [],
      post: "",
    };
  },
  methods: {
    async addPost() {
      let newPost = {
        authorID: this.$auth.$state.user._id,
        authorUsername: this.$auth.user.full_name,
        comment: this.post,
        model: this.data._id,
      };
      console.log(newPost);
      try {
        await this.$axios.post("api/comments", newPost);
        this.post = "";
      } catch (err) {
        console.log(err);
      }
      const res = await this.$axios.get(`api/models/${this.$route.params.id}`);
      this.data = res.data;
    },
    async remove(id) {
      try {
        await this.$axios.delete(`api/comments/${id}`);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteModel(id) {
      try {
        await this.$axios.delete(`api/models/${id}`);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    currentId() {
      return this.$auth.$state.user._id;
    },
  },
  async fetch() {
    const res = await this.$axios.get(`api/models/${this.$route.params.id}`);
    this.data = res.data;
  },
};
</script> 
<style>
.delete {
  color: red;
  font-weight: bold;
}
</style>