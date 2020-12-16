<template>
  <div class="header">
    <v-card
      class="align-center pa-0 fill-height elevation-0"
      color="light--text"
      height="100%"
    >
      <v-app-bar dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
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
          <v-list-item
            exact
            to="/home/instituicoes"
            v-if="isValidadora && canSeeInst"
            >Instituições
          </v-list-item>
          <v-list-item exact to="/home/usuarios" v-if="canSeeFunc"
            >Funcionários</v-list-item
          >
          <v-list-item exact to="/home/cursos" v-if="isValidadora"
            >Cursos</v-list-item
          >
          <v-list-item exact to="/home/solicitacoes" v-if="canSeeSolicitations"
            >Solicitações</v-list-item
          >
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
import consts from "../../consts/consts";
export default {
  name: "Header",
  data: () => {
    return {
      drawer: false,
      user: null,
    };
  },
  created() {
    console.log(localStorage);
    this.user =
      localStorage.nome.charAt(0).toUpperCase() +
      localStorage.nome.substring(1);
  },
  watch: {
    localStorage() {
      this.user =
        localStorage.nome.charAt(0).toUpperCase() +
        localStorage.nome.substring(1);
    },
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
    canSeeFunc() {
      return consts.CAN_MANAGE_USERS.includes(localStorage.cargo);
    },
    canSeeInst() {
      return consts.CAN_GET_EDIT_INST.includes(localStorage.cargo);
    },
    canSeeCourses() {
      return consts.CAN_MANAGE_COURSES.includes(localStorage.cargo);
    },
    canSeeSolicitations() {
      return consts.CAN_GET_SOLICITATIONS.includes(localStorage.cargo);
    },
    isValidadora() {
      return consts.CAN_MANAGE_COURSES.includes(localStorage.cargo);
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
