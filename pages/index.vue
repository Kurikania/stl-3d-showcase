<template>
  <v-container>
    <v-row align="center" justify="center">
      <section style="height: 100px"></section>
      <section class="separador-top top separador-bottom">
        <h1>Share your best work</h1>
        <v-btn color="indigo" @click.native="start" dark large
          >Get started</v-btn
        >
      </section>
      <section style="height: 150px"></section>
      <section class="separador-top separador-bottom">
        <h3> About this project </h3>
        <p>
          STL is a file format native to the stereolithography CAD software
          created by 3D Systems. STL has several backronyms such as
          "Standard Triangle Language" and "Standard Tessellation Language".
          This file format is supported by many other software packages; it is
          widely used for rapid prototyping, 3D printing and computer-aided
          manufacturing. STL files describe only the surface geometry of a
          three-dimensional object without any representation of color, texture
          or other common CAD model attributes. The STL format specifies both
          ASCII and binary representations. Binary files are more common, since
          they are more compact.
        </p>
        <span class="caption">-from Wikipedia</span>

        <p>
          Please note that this is not a real service, but a prototype for eductional purposes
        </p>
      </section>
      <section style="height: 150px"></section>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    start() {
      if (this.$auth.$state.user) {
        this.$router.push("/models/recent");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px !important;
  width: 100vw !important;
  max-width: 100vw !important;
}
section {
  width: 100vw !important;
  max-width: 100vw !important;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  color: rgb(17, 22, 66);
  font-size: 2em;
  padding: 20px;
}
.overlay {
  background-color: rgba(248, 247, 216, 0.322);
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100vw;
  max-height: 100vh;
  height: 100%;
}

.separador-top {
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.separador-top:before {
  content: "";
  position: absolute;
  border-style: solid;
  border-color: transparent #fff #fff transparent;
  top: -80px;
  border-width: 0 0 80px 100vw;
}

.separador-bottom {
  background: #fff;
  position: relative;
}

.separador-bottom:after {
  content: "";
  position: absolute;
  border-style: solid;
  bottom: -80px;
  border-width: 80px 100vw 0 0;
  border-color: #fff transparent transparent #fff;
}

p {
  max-width: 1000px;
  margin: auto;
}
</style>
