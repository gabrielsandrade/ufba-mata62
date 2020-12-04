<template>
  <div class="home">
    <div class="title"></div>
    <div class="d-flex flex-column align-center fill-height">
      <p class="display-2 text-center mt-8">
        Bem vindo a plataforma de gerenciamento de faculdades
      </p>
      <div class="cards d-flex justify-space-around align-center fill-height">
        <v-card exact to="/home/instituicoes" height="250px" min-width="250px" hover>
          <v-icon>mdi-office-building</v-icon>
          <v-card-title>Instituições</v-card-title>
        </v-card>
        <v-card exact to="/home/cursos" height="250px" min-width="250px" hover>
          <v-icon>mdi-book-multiple</v-icon>
          <v-card-title>Cursos</v-card-title>
        </v-card>
        <v-card exact to="/home/usuarios" height="250px" min-width="250px" hover>
          <v-icon>mdi-account-multiple</v-icon>
          <v-card-title>Funcionários</v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
