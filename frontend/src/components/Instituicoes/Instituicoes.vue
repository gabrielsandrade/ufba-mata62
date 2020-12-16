<template>
  <div class="main">
    <div class="list-cursos mx-2 px-8">
      <ModalInstituicao
        ref="modalInst"
        v-if="isSuperintendente"
        v-on:edited="getInsts"
      />
      <ModalUsuario />
      <DataTable
        :items="instituicoes"
        :headers="_headers"
        :loading="loading"
        v-on:editar="edit"
        v-on:delete="deleteInst"
      />
    </div>
  </div>
</template>

<script>
import Api from "../../services/api.js";
import DataTable from "../DataTable/DataTable";
import ModalInstituicao from "./components/ModalInstituicao";
import ModalUsuario from "./components/ModalUsuario";
export default {
  name: "InstituicoesAtivas",
  components: {
    DataTable,
    ModalInstituicao,
    ModalUsuario,
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
    this.getInsts();
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
    getInsts() {
      this.instituicoes = [];
      Api.post("/instituicao", { status: "Ativa" })
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
    edit(item) {
      this.$refs.modalInst.instituicao.nome_instituicao = item.nome_instituicao;
      this.$refs.modalInst.instituicao.mantenedora_nome = item.mantenedora_nome;
      this.$refs.modalInst.instituicao.mantenedora_cnpj = item.mantenedora_cnpj;
      this.$refs.modalInst.instituicao.credenciamento = item.credenciamento;
      this.$refs.modalInst.instituicao.cep = item.cep;
      this.$refs.modalInst.instituicao.rua = item.rua;
      this.$refs.modalInst.instituicao.bairro = item.bairro;
      this.$refs.modalInst.instituicao.cidade = item.cidade;
      this.$refs.modalInst.instituicao.estado = item.estado;
      this.$refs.modalInst.instituicao.status = item.status;
      this.$refs.modalInst.dialog = true;
      this.$refs.modalInst.editing = true;
      this.$refs.modalInst.nomeOriginal = item.nome_instituicao;
    },
    deleteInst(item) {
      console.log(item);
      Api.post("instituicao/delete", {
        nome_instituicao: item.nome_instituicao,
      }).then(() => {
        this.instituicoes = [];
        this.getInsts();
      });
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
