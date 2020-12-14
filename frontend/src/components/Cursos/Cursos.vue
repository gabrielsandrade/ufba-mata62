<template>
  <div class="main">
    <p class="info--text text-center my-4">
      {{ user }} você está na tela de cursos
    </p>
    <div class="list-cursos mx-2 px-8">
      <DataTable :items="cursos" :headers="headers" />
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
      user: localStorage.nome,
      logged: null,
      headers: [
        // { text: "Curso", value: "name" },
        // { text: "Alunos", value: "cursos" },
        // { text: "Código", value: "codigo" },
        // { text: "Ações", value: "actions", sortable: false },
        { text: "nome_curso" , value : "nome_curso" },
        { text: "grau" , value : "grau" },
        { text: "codigo_mec" , value : "codigo_mec" },
        { text: "id_curso" , value : "id_curso" },
        { text: "id_instituicao" , value : "id_instituicao" },
        { text: "publicacao" , value : "publicacao" },
        { text: "publicacao_data" , value : "publicacao_data" },
        { text: "reconhecimento" , value : "reconhecimento" },
        { text: "reconhecimento_data" , value : "reconhecimento_data" },
        { text: "observacao" , value : "observacao" },
      ],
      cursos: [],
    };
  },

  created() {
    Api.get("curso").then((response) => {
      console.log(response);
      response.data.data.forEach((element) => {
        let curso = {
          nome_curso: element.nome_curso,
          grau: element.grau,
          codigo_mec: element.codigo_mec,
          id_curso: element.id_curso,
          id_instituicao: element.id_instituicao,
          publicacao: element.publicacao,
          publicacao_data: element.publicacao_data,
          reconhecimento: element.reconhecimento,
          reconhecimento_data: element.reconhecimento_data,
          observacao: element.observacao,
        };
        this.cursos.push(curso);
      });
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
