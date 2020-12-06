<template>
  <v-card
    class="form-card d-flex justify-center fill-height"
    elevation="4"
    text
  >
    <Instituicao
      v-if="etapa == 1"
      v-on:avancarEtapa="avancarEtapa"
      :etapa.sync="etapa"
      :instituicao="instituicao"
    />
    <Usuario
      v-on:voltarEtapa="voltarEtapa"
      v-on:avancarEtapa="avancarEtapa"
      v-on:update-diretor="updateDiretor"
      :user="diretor"
      :etapa.sync="etapa"
      v-else-if="etapa == 2"
    />
    <Usuario
      v-on:voltarEtapa="voltarEtapa"
      v-on:avancarEtapa="avancarEtapa"
      v-on:update-dirigente="updatedirigente"
      :user="dirigente"
      :etapa.sync="etapa"
      v-else
    />
  </v-card>
</template>

<script>
import Api from "../../../services/api.js";
import AuthenticationServices from "../../../services/AuthenticationServices.js";
import Instituicao from "./Instituicao/Instituicao";
import Usuario from "./Usuario/Usuario";
export default {
  name: "Login",
  components: {
    Instituicao,
    Usuario,
  },
  created() {
    console.log(this.etapa);
    if (localStorage.nome != null) this.$router.push("home");
  },
  data: () => ({
    errorLogin: null,
    etapa: 1,
    instituicao: {
      nome_instituicao: null,
      cep: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    },
    diretor: {
      nome: null,
      sobrenome: null,
      email: null,
      cpf: null,
      telefone: null,
    },
    dirigente: {
      nome: null,
      sobrenome: null,
      email: null,
      cpf: null,
      telefone: null,
    },
  }),
  computed: {
    minLenght() {
      return this.user.length > 0 && this.password.length > 4;
    },
  },
  methods: {
    handleSubmit(evt) {
      let data = {
        user: evt.target[0].value,
        senha: evt.target[1].value,
      };
      Api.post("login", data)
        .then(() => {
          localStorage.nome = this.user;
          this.$router.push("home");
        })
        .catch(() => (this.errorLogin = true));
    },
    avancarEtapa() {
      console.log("aumentando etapa");
      this.etapa += 1;
    },
    voltarEtapa() {
      console.log("reudizindo etapa");
      this.etapa -= 1;
    },
    updateDiretor(args, etapa) {
      console.log("updateDiretor");
      this.etapa += etapa;
      console.log(this.etapa);
    },
    updatedirigente(args, etapa) {
      console.log("updateSuper");
      etapa > 0 ? (this.etapa += 1) : (this.etapa -= 1);
      if (this.etapa >= 4) {
        console.log(this.instituicao, this.diretor, this.dirigente);
        this.cadastrar(this.instituicao, this.diretor, this.dirigente);
      }
      console.log(this.etapa);
    },
    cadastrar(instituicao, diretor, dirigente) {
      AuthenticationServices.cadastroInicial(instituicao, diretor, dirigente);
      // this.$router.go("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-card {
  width: 500px;
  height: calc(100vh - 48px);
  border-top-left-radius: 0%;
}

.form {
  max-width: 400px;
}
</style>
