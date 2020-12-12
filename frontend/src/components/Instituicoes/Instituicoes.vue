<template>
  <div class="main">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="" class="my-4" dark v-bind="attrs" v-on="on">
            Adicionar instituição
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Instituição</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    v-model="instituicao.nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nome da manenedora"
                    required
                    v-model="instituicao.mantenedora_nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="CNPJ da mantenedora"
                    v-model="instituicao.mantenedora_cnpj"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Rua"
                    required
                    v-model="instituicao.rua"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="CEP"
                    required
                    v-model="instituicao.cep"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Cidade"
                    required
                    v-model="instituicao.cidade"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Bairro"
                    required
                    v-model="instituicao.bairro"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Estado"
                    required
                    v-model="instituicao.estado"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Credenciamento"
                    required
                    v-model="instituicao.credenciamento"
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
            <v-btn color="blue darken-1" text @click="dialog = false">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="list-cursos mx-2 px-8">
      <DataTable
        :items="instituicoes"
        :headers="_headers"
        :loading="loading"
        v-on:editar="edit"
      />
    </div>
  </div>
</template>

<script>
import Api from "../../services/api.js";
import DataTable from "../DataTable/DataTable";
export default {
  name: "InstituicoesAtivas",
  components: {
    DataTable,
  },
  data: () => {
    return {
      dialog: false,
      loading: false,
      user: localStorage.nome.toUpperCase(),
      logged: null,
      instituicao: {
        nome: null,
        mantenedora_nome: null,
        mantenedora_cnpj: null,
        credenciamento: null,
        cep: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
        status: null,
      },
      headers: [
        { text: "Nome", value: "nome", show: true },
        { text: "Mantenedora nome", value: "mantenedora_nome", show: true },
        { text: "Mantenedora cnpj", value: "mantenedora_cnpj", show: true },
        { text: "Credenciamento", value: "credenciamento", show: true },
        { text: "Cep", value: "cep", show: true },
        { text: "Rua", value: "rua", show: true },
        { text: "Bairro", value: "bairro", show: true },
        { text: "Cidade", value: "cidade", show: true },
        { text: "Estado", value: "estado", show: true },
        { text: "Status", value: "status", show: true },
        { text: "Ações", value: "actions", sortable: false, show: true },
      ],
      instituicoes: [],
    };
  },

  created() {
    this.loading = true;
    Api.get("/instituicao")
      .then((response) => {
        response.data.data.forEach((instituicao) => {
          let inst = {
            nome: instituicao.nome_instituicao,
            mantenedora_nome: instituicao.mantenedora_nome,
            mantenedora_cnpj: instituicao.mantenedora_cnpj,
            credenciamento: instituicao.credenciamento,
            cep: instituicao.cep,
            rua: instituicao.rua,
            bairro: instituicao.bairro,
            cidade: instituicao.cidade,
            estado: instituicao.estado,
            status: instituicao.status,
          };
          this.instituicoes.push(inst);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.loading = false));
    console.log(this.funcionarios);
  },
  computed: {
    _headers() {
      return this.headers.filter((h) => h.show);
    },
  },
  methods: {
    edit(item) {
      console.log(item);
      this.instituicao.nome = item.nome;
      this.instituicao.mantenedora_nome = item.mantenedora_nome;
      this.instituicao.mantenedora_cnpj = item.mantenedora_cnpj;
      this.instituicao.credenciamento = item.credenciamento;
      this.instituicao.cep = item.cep;
      this.instituicao.rua = item.rua;
      this.instituicao.bairro = item.bairro;
      this.instituicao.cidade = item.cidade;
      this.instituicao.estado = item.estado;
      this.instituicao.status = item.status;
      this.dialog = true;
    },
    reset() {
      this.instituicao.nome = null;
      this.instituicao.mantenedora_nome = null;
      this.instituicao.mantenedora_cnpj = null;
      this.instituicao.credenciamento = null;
      this.instituicao.cep = null;
      this.instituicao.rua = null;
      this.instituicao.bairro = null;
      this.instituicao.cidade = null;
      this.instituicao.estado = null;
      this.instituicao.status = null;
      this.dialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
</style>
