<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>
html {
  overflow-y: hidden !important;
}
#app {
  background-color: #eeeeee;
}
</style>
