<template>
  <div class="home">
    <div class="title"></div>
    <div class="d-flex flex-column align-center fill-height elevation-0">
      <p class="display-2 text-center mt-8">
        Bem vindo a plataforma de gerenciamento de faculdades
      </p>
      <div
        class="cards d-flex justify-space-around align-center fill-height flex-wrap"
      >
        <v-card
          exact
          to="/home/instituicoes"
          height="250px"
          min-width="250px"
          hover
          class="my-4"
          v-if="isValidadora"
        >
          <v-icon>mdi-office-building</v-icon>
          <v-card-title>Instituições</v-card-title>
        </v-card>
        <v-card
          exact
          to="/home/cursos"
          height="250px"
          min-width="250px"
          hover
          class="my-4"
        >
          <v-icon>mdi-book-multiple</v-icon>
          <v-card-title>Cursos</v-card-title>
        </v-card>
        <v-card
          exact
          to="/home/usuarios"
          height="250px"
          min-width="250px"
          hover
          class="my-4"
        >
          <v-icon>mdi-account-multiple</v-icon>
          <v-card-title>Funcionários</v-card-title>
        </v-card>

        <v-card
          exact
          to="/home/solicitacoes"
          height="250px"
          min-width="250px"
          hover
          class="my-4"
        >
          <v-icon>mdi-account-multiple</v-icon>
          <v-card-title>Solicitações</v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {};
  },
  computed: {
    isValidadora() {
      return localStorage.validadora;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: auto;
  height: calc(100vh - 48px);
  width: 100vw;

  .cards {
    width: 70vw;
  }
}
</style>
