<template>
  <div>
    <h4>Make a cover for your model</h4>
    <model-stl
      v-if="span"
      ref="model"
      :src="src"
      :width="width"
      :glOptions="{ preserveDrawingBuffer: true }"
    />
    <img class="snapshot" v-if="base64 && snap" :src="base64" />
    <v-btn type="button" class="create" @click="snapshot">Snapshot</v-btn>
  </div>
</template>

<script>
import { ModelStl } from "vue-3d-model";
  export default {
    props: ['src'],
    components: { ModelStl },
    name: "Screenshot",
    data() {
      return {
        span: true,
        width: 400,
        base64: null
      };
    },
    methods: {
      snapshot() {
        this.snap = false
        this.base64 = this.$refs.model.renderer.domElement.toDataURL('image/png', 1);
        this.$emit('clicked', this.base64)
      }
    },
  }
</script>