<template>
  <div class="header">
    <v-card class="align-center pa-0 fill-height elevation-0" color="light--text" height="100%">
      <v-app-bar dark>
        <v-app-bar-nav-icon
          @click="drawer = true"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-icon class="mr-2" @click="logOut">mdi-exit-to-app</v-icon>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar class="secondary">
              <v-icon dark>mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list class=""
          ><v-list-item exact to="/home">Página Inicial</v-list-item>
          <v-list-item exact to="/home/instituicoes" v-if="validadora"
            >Instituições</v-list-item
          >
          <v-list-item exact to="/home/cursos" v-if="!validadora"
            >Cursos</v-list-item
          >
          <v-list-item exact to="/home/usuarios">Usuários</v-list-item>
          <v-list-item class="white--text" color="grey darken" @click="logOut"
            >Sair</v-list-item
          >
        </v-list>
      </v-navigation-drawer>
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>
import Api from "../../services/api";
export default {
  name: "Header",
  data: () => {
    return {
      drawer: false,
      user: null,
    };
  },
  created() {
    this.user =
      localStorage.nome.charAt(0).toUpperCase() +
      localStorage.nome.substring(1);
  },
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
      console.log(localStorage.nome);
      return localStorage.nome == "carol";
    },
  },
};
</script>

<style lang="scss">

.header {
  width: 100vw;
}
// .avatar {
//   background-color: #000;
// }
</style>
