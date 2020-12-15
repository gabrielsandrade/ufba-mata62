<template>
  <div class="main">
    <div class="list-cursos mx-2 px-8">
      <DataTable
        :items="instituicoes"
        :headers="_headers"
        :loading="loading"
        solicitacao="true"
        v-on:accept="accept"
        v-on:delete="deleteInst"
      />
    </div>
  </div>
</template>

<script>
import Api from "../../services/api.js";
import AuthenticationServices from "../../services/AuthenticationServices";
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
      headers: [
        { text: "Nome", value: "nome_instituicao", show: true },
        { text: "Mantenedora nome", value: "mantenedora_nome", show: true },
        { text: "Mantenedora cnpj", value: "mantenedora_cnpj", show: true },
        { text: "Credenciamento", value: "credenciamento", show: true },
        { text: "Cep", value: "cep", show: true },
        { text: "Rua", value: "rua", show: true },
        { text: "Bairro", value: "bairro", show: true },
        { text: "Cidade", value: "cidade", show: true },
        { text: "Estado", value: "estado", show: true },
        { text: "Ações", value: "actions", sortable: false, show: true },
      ],
      instituicoes: [],
    };
  },

  created() {
    this.loading = true;
    this.headers[this.headers.length - 1].show = this.isSuperintendente;
    Api.post("/instituicao", { status: "pendente" })
      .then((response) => {
        response.data.data.forEach((instituicao) => {
          let inst = {
            nome_instituicao: instituicao.nome_instituicao,
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
  },
  computed: {
    isSuperintendente() {
      return localStorage.cargo == "SUPER";
    },
    _headers() {
      return this.headers.filter((h) => h.show);
    },
  },
  methods: {
    deleteInst(item) {
      console.log(item);
    },
    accept(instituicao) {
      instituicao.status = "Ativa";
      console.log(instituicao);
      AuthenticationServices.editarInstituicao(instituicao)
        .then(() => this.$router.go())
        .catch((err) => console.log(err));
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
