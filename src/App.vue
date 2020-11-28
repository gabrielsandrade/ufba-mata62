<template>
  <v-app>
    <v-main>
      <Authentication />
    </v-main>
  </v-app>
</template>

<script>
import Authentication from "./components/Authentication/Authentication";

export default {
  name: "App",

  components: {
    Authentication,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
#app {
  background-image: url("../public/wpp-login.jpeg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}
</style>
