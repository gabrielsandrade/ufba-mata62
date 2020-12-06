<template>
  <div class="main">
    <p class="info--text text-center my-4">Bem vindo(a) {{ user }}</p>
    <div class="list-cursos mx-2 px-8">
      <DataTable :items="funcionarios" :headers="_headers" />
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
        { text: "Nome", value: "nome", show: true },
        { text: "Sobrenome", value: "sobrenome", show: true },
        { text: "Telefone", value: "telefone", show: true },
        { text: "CPF", value: "cpf", show: true },
        { text: "Email", value: "email", show: true },
        { text: "Cargo", value: "cargo", show: true },
        { text: "Ações", value: "actions", show: true },
      ],
      funcionarios: [],
    };
  },

  created() {
    Api.get("/user")
      .then((response) => {
        console.log(response.data.data);
        response.data.data.forEach((usuario) => {
          let funcionario = {
            nome: usuario.nome_funcionario,
            sobrenome: usuario.sobrenome,
            telefone: usuario.telefone_funcionario,
            cpf: usuario.cpf,
            email: usuario.email_funcionario,
            cargo: usuario.cargo,
          };
          this.funcionarios.push(funcionario);
        });
      })
      .catch((err) => {
        console.log(err);
        // this.$router.push("/");
        this.logged = false;
      });
    console.log(this.funcionarios);
  },
  computed: {
    _headers() {
      return this.headers.filter((h) => h.show);
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
