<template>
  <div class="viewport"></div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "ViewPort",
  props: {},
  data() {
    return {
      height: 0,
    };
  },
  methods: {
    ...mapMutations(["RESIZE"]),
    ...mapActions(["INIT", "ANIMATE"]),
  },
  mounted() {
    this.INIT({
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight,
      el: this.$el,
    }).then(() => {
      this.ANIMATE();
      window.addEventListener("resize", () => {
        this.RESIZE({
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight,
        });
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.viewport {
  height: 100%;
  width: 100%;
}
</style>