<template>
  <div class="main">
    <p class="info--text text-center my-4">
      {{ user }} você está na tela de cursos
    </p>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="" class="my-4" dark v-bind="attrs" v-on="on">
            Adicionar Curso
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Curso</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nome do curso"
                    v-model="curso.nome_curso"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Grau"
                    required
                    v-model="curso.grau"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Código MEC"
                    v-model="curso.codigo_mec"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Publicação"
                    required
                    hint="Número da portaria"
                    v-model="curso.publicacao"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Data de publicação"
                    required
                    v-model="curso.publicacao_data"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Reconhecimento"
                    required
                    hint="Número da portaria"
                    v-model="curso.reconhecimento"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Data de reconhecimento"
                    required
                    v-model="curso.reconhecimento_data"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Observação"
                    required
                    v-model="curso.observacao"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="reset">
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text @click="salvar">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="list-cursos mx-2 px-8">
      <DataTable
        :items="cursos"
        :headers="headers"
        v-on:editar="editCourse"
        v-on:delete="deleteCourse"
      />
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
      editing: false,
      dialog: false,
      user: localStorage.nome,
      logged: null,
      curso: {
        nome_curso: null,
        grau: null,
        codigo_mec: null,
        id_curso: null,
        id_instituicao: null,
        publicacao: null,
        publicacao_data: null,
        reconhecimento: null,
        reconhecimento_data: null,
        observacao: null,
      },
      headers: [
        { text: "Nome do curso", value: "nome_curso" },
        { text: "Grau", value: "grau" },
        { text: "Código do MEC", value: "codigo_mec" },
        { text: "Publicacao", value: "publicacao" },
        { text: "Data de publicação", value: "publicacao_data" },
        { text: "Reconhecimento", value: "reconhecimento" },
        { text: "Data de reconhecimento", value: "reconhecimento_data" },
        { text: "Observacao", value: "observacao" },
        { text: "Ações", value: "actions" },
      ],
      cursos: [],
    };
  },
  methods: {
    editCourse(element) {
      console.log(element);
      this.curso.nome_curso = element.nome_curso;
      this.curso.grau = element.grau;
      this.curso.codigo_mec = element.codigo_mec;
      this.curso.id_curso = element.id_curso;
      this.curso.id_instituicao = element.id_instituicao;
      this.curso.publicacao = element.publicacao;
      this.curso.publicacao_data = element.publicacao_data;
      this.curso.reconhecimento = element.reconhecimento;
      this.curso.reconhecimento_data = element.reconhecimento_data;
      this.curso.observacao = element.observacao;
      this.editing = true;
      this.dialog = true;
    },
    deleteCourse(item) {
      Api.post("curso/delete", { id_curso: item.id_curso }).then(() =>
        this.getCourses()
      );
    },
    getCourses() {
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
    salvar() {
      if (!this.editing) {
        Api.post("curso", {
          nome_curso: this.curso.nome_curso,
          grau: this.curso.grau,
          codigo_mec: this.curso.codigo_mec,
          publicacao: this.curso.publicacao,
          publicacao_data: this.curso.publicacao_data,
          reconhecimento: this.curso.reconhecimento,
          reconhecimento_data: this.curso.reconhecimento_data,
          observacao: this.curso.observacao,
        }).then(() => this.reset());
      } else {
        Api.post("curso/edit", this.curso).then(() => this.reset());
      }
    },
    reset() {
      this.curso.nome_curso = null;
      this.curso.grau = null;
      this.curso.codigo_mec = null;
      this.curso.publicacao = null;
      this.curso.publicacao_data = null;
      this.curso.reconhecimento = null;
      this.curso.reconhecimento_data = null;
      this.curso.observacao = null;
      this.dialog = false;
      this.editing = false;
    },
  },

  created() {
    this.getCourses();
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
</style>
