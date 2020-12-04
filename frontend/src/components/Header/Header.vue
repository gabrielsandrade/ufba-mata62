<template>
  <div class="header">
    <v-toolbar class="pa-0" color="dark light--text">
      <router-link
        to="/"
        height="40px"
        tag="img"
        v-bind:src="'/src/assets/logo-transparent.png'"
      >
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="">
        <v-btn exact to="/home/instituicoes" v-if="validadora"
          >Instituições</v-btn
        >
        <v-btn exact to="/home/cursos" v-if="!validadora">Cursos</v-btn>
        <v-btn exact to="/home/usuarios">Usuários</v-btn>
        <v-btn class="white--text" color="grey darken" @click="logOut"
          >Sair</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Api from "../../services/api";
export default {
  name: "Header",
  methods: {
    logOut() {
      Api.post("/logout").then(() => {
        localStorage.clear();
        this.$router.push("/");
      });
    },
  },
  computed: {
    validadora: function() {
      console.log(localStorage.name);
      return localStorage.name == "carol";
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
