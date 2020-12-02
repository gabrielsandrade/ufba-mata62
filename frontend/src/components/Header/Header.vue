<template>
  <div class="header">
    <v-toolbar color="dark light--text">
      <img src="../../assets/logo-transparent.png" height="60px" />
      <v-spacer></v-spacer>
      <v-btn class="mr-4 white--text" color="grey darken" @click="logOut"
        >Sair</v-btn
      >
    </v-toolbar>
  </div>
</template>

<script>
import Api from "../../services/api";
export default {
  name: "Header",
  methods: {
    logOut() {
      Api.post("/logout").then(() => this.$router.push("/"));
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100vw;
}
</style>
