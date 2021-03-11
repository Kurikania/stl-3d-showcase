<template>
  <v-container class="text-center">
        <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
        </v-overlay>
    <v-row style="margin-top: 20px" justify="center">
    <v-card class="mx-auto" max-width="500">
      <v-card-text>
        <v-card-title primary-title> Add New Model </v-card-title>
        <div class="text--primary">
          Please upload your 3d model en stl format<br />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-form
          enctype="multipart/form-data"
          @submit.prevent.native="onSubmit"
          id="model-send"
        >
          <v-text-field
            v-model="title"
            :counter="20"
            :rules="titleRules"
            label="Name"
            required
          ></v-text-field>
          <label id="file">Модель в формате stl</label>
          <input
            type="file"
            id="model"
            ref="model"
            @change="onSelect('model')"
          />
          <Screenshot
            v-if="model && !cover"
            @clicked="coverRecieve"
            :src="model"
          />
          <v-text-field
            v-model="description"
            label="Description"
            required
          ></v-text-field>
          <v-btn text color="teal accent-4" type="submit" form="model-send">
            Add New
          </v-btn>
        </v-form>
      </v-card-actions>
      <snack-bar :snackbar-message.sync="snackbarMessage"></snack-bar>
    </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Screenshot from "@/components/screenshot";
import SnackBar from "@/components/snackBar";
export default {
  components: { Screenshot, SnackBar },
  data() {
    return {
      screenshot: false,
      description: "",
      cover: null,
      title: "",
      file: "",
      modelFile: "",
      model: "",
      snackbarMessage: "",      
      isLoading: false,
      titleRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
      ],
    };
  },
  methods: {
    coverRecieve(val) {
      this.cover = val;
      this.snackbar = true;
      this.snackbarMessage = "Cover added!";
    },
    onSelect(obj) {
      if (obj == "file") {
        const file = this.$refs.file.files[0];
        this.file = file;
        this.createBase64(this.file);
      } else {
        const file = this.$refs.model.files[0];
        this.modelFile = file;
        this.createBase64Model(this.modelFile);
      }
    },
    createBase64(obj) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.cover = e.target.result;
      };
      reader.readAsDataURL(obj);
    },
    createBase64Model(obj) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.model = e.target.result;
      };
      reader.readAsDataURL(obj);
    },
    async onSubmit() {
      let sendModel = {
        title: this.title,
        cover: this.cover,
        model: this.model,
        description: this.description,
        authorID: this.$auth.$state.user._id,
        authorUsername: this.$auth.user.full_name,
      };
      if (this.title != "" && this.cover != "" && this.model != "") {
        this.isLoading = true
        try {
          await this.$axios.post("api/models", sendModel).then(() => {
            this.isLoading = false
          this.$nuxt.$router.replace({ path: '/models/recent'})
          })
        } catch (err) {
          console.log(err);
          this.snackbar = true;
          this.snackbarMessage = err;
        }  
      } else {
        this.snackbar = true;
        this.snackbarMessage = "Please fill out the form";
      }
    },
  },
};
</script>