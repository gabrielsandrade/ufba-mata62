<template>
  <div class="header">
    <v-toolbar class="pa-0" color="dark light--text">
      <img src="../../assets/logo-transparent.png" height="60px" />
      <v-spacer></v-spacer>
      <v-toolbar-items class="">
        <v-btn>Instituições</v-btn>
        <v-btn>Cursos</v-btn>
        <v-btn>Usuários</v-btn>
      <v-btn class="white--text" color="grey darken" @click="logOut"
        >Sair</v-btn>
      </v-toolbar-items>
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

<style lang="scss">
.v-toolbar__content {
      padding: 0px !important;
    }
.header {
  width: 100vw;
}
</style>
