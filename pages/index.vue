<template>
  <v-container>
    <v-row align="center" justify="center">
      <section style="height: 50px">

      </section>
      <section  class="separador-top separador-bottom">
        <h1>Share your best work</h1>
        <v-btn color="indigo" dark large @click="start">Get started</v-btn>
      </section>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  padding: 0px  !important;
    width: 100vw !important;
  max-width: 100vw  !important;
}
section {
  width: 100vw !important;
  max-width: 100vw  !important;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  color: rgb(17, 22, 66);
  font-size: 5em;
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
  top: -80px;
  border-style: solid;
  border-width: 0 0 80px 100vw;
  border-color: transparent #fff #fff transparent;
}

.separador-bottom {
  background: #fff;
  position: relative;
}
.separador-bottom:after {
  content: "";
  position: absolute;
  bottom: -80px;
  border-style: solid;
  border-width: 80px 100vw 0 0;
  border-color: #fff transparent transparent #fff;
}
</style>
