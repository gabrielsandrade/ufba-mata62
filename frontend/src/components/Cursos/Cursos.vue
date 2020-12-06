<template>
  <div class="main">
    <p class="info--text text-center my-4">
      {{ user }} você está na tela de cursos
    </p>
    <div class="list-cursos mx-2 px-8">
      <DataTable :items="faculdades" :headers="headers" />
    </div>
  </div>
</template>

<script>
// import Api from "../services/api.js";
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
        { text: "Curso", value: "name" },
        { text: "Alunos", value: "cursos" },
        { text: "Código", value: "codigo" },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      faculdades: [
        {
          name: "Engenharia Elétrica",
          cursos: 37,
          codigo: "XXXXX",
        },
        {
          name: "Engenharia Civil",
          cursos: 40,
          codigo: "XXXXX",
        },
        {
          name: "UNIJORGE",
          cursos: 54,
          codigo: "XXXXX",
        },
        {
          name: "Faculdade 2 de Julho",
          cursos: 70,
          codigo: "XXXXX",
        },
        {
          name: "UNIME",
          cursos: 62,
          codigo: "XXXXX",
        },
        {
          name: "UNIRB",
          cursos: 79,
          codigo: "XXXXX",
        },
        {
          name: "UNIFACS",
          cursos: 56,
          codigo: "XXXXX",
        },
        {
          name: "UCSAL",
          cursos: 43,
          codigo: "XXXXX",
        },
        {
          name: "UNIESQUINA",
          cursos: 92,
          codigo: "XXXXX",
        },
        {
          name: "Faculdade outra da Devry",
          cursos: 25,
          codigo: "XXXXX",
        },
      ],
    };
  },

  created() {},
};
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
</style>
