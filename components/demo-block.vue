<template>
  <model-stl
    :backgroundAlpha="bgAlpha"
    :backgroundColor="bgColor"
    :width="width"
    :src="src"
  ></model-stl>
</template>
<script>
import { ModelStl } from "vue-3d-model";
export default {
  props: ["src"],
  name: "Demo",
  components: { ModelStl },
  data() {
    return {
      width: 300,
      height: 300,
      bgColor: "#eee",
      bgAlpha: 0.5,
    };
  },
};
</script>