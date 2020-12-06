<template>
  <div class="main">
    <p class="info--text text-center my-4">Bem vindo(a) {{ user }}</p>
    <div class="list-cursos mx-2 px-8">
      <DataTable :items="faculdades" :headers="headers" />
    </div>
  </div>
</template>

<script>
import Api from "../../services/api.js";
import DataTable from "../DataTable/DataTable";
export default {
  name: "HelloWorld",
  components: {
    DataTable,
  },
  data: () => {
    return {
      user: localStorage.nome.toUpperCase(),
      logged: null,
      headers: [
        { text: "Faculdade", value: "name" },
        { text: "Cursos", value: "cursos" },
        { text: "Ações", value: "actions" },
      ],
      faculdades: [
        {
          name: "FTC",
          cursos: 37,
        },
        {
          name: "Faculdade Ruy Barbosa",
          cursos: 40,
        },
        {
          name: "UNIJORGE",
          cursos: 54,
        },
        {
          name: "Faculdade 2 de Julho",
          cursos: 70,
        },
        {
          name: "UNIME",
          cursos: 62,
        },
        {
          name: "UNIRB",
          cursos: 79,
        },
        {
          name: "UNIFACS",
          cursos: 56,
        },
        {
          name: "UCSAL",
          cursos: 43,
        },
        {
          name: "UNIESQUINA",
          cursos: 92,
        },
        {
          name: "Faculdade outra da Devry",
          cursos: 25,
        },
      ],
    };
  },

  created() {
    Api.get("/user")
      .then((response) => {
          console.log(response.data.data);
          response.forEach(usuario => {
              console.log(usuario);
          });
      })
      .catch((err) => {
          console.log(err);
        // this.$router.push("/");
        this.logged = false;
      });
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
</style>
