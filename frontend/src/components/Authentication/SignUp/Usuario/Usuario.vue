<template>
  <div>
    <v-form class="form mt-8" @submit.prevent="handleSubmit">
      <div class="text-center">
        <img src="logo-transparent.png" alt="Company logo" />
        <h1 class="blue-grey--text mb-8 text-center">
          {{ etapa == 2 ? "DIRETOR" : "dirigente" }}
        </h1>
        <v-card elevation="0">
          <v-text-field
            v-model="usuario.email"
            label="Email do usuário"
            class="inputField"
          ></v-text-field>
        </v-card>
        <v-card elevation="0" class="d-flex">
          <v-text-field
            v-model="usuario.nome"
            label="Nome"
            class="mr-4"
          ></v-text-field>
          <v-text-field
            v-model="usuario.sobrenome"
            label="Sobrenome"
          ></v-text-field>
        </v-card>
        <v-card elevation="0" class="d-flex">
          <v-text-field
            v-model="usuario.cpf"
            label="CPF"
            class="mr-4"
          ></v-text-field>
          <v-text-field
            v-model="usuario.telefone"
            label="Telefone"
          ></v-text-field>
        </v-card>
      </div>
      <div class="d-flex justify-space-between align-center mt-8">
        <v-btn color="info mb-2" @click="voltarEtapa" width="200px"
          >Voltar</v-btn
        >
        <v-btn :color="etapa == 2 ? 'info mb-2' : 'success mb-2'" type="submit" width="200px">{{
          etapa == 2 ? "Próximo" : "Cadastrar"
        }}</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Usuario",
  props: ["etapa", "user"],
  data: () => {
    return {
      usuario: {
        nome: null,
        sobrenome: null,
        email: null,
        cpf: null,
        telefone: null,
      },
    };
  },
  mounted() {
    this.usuario = this.user;
    console.log(this.usuario);
  },
  methods: {
    handleSubmit() {
      console.log(this.etapa);
      if (this.etapa == 2) this.$emit("update-diretor", this.usuario, 1);
      if (this.etapa == 3)
        this.$emit("update-dirigente", this.usuario, 1);
    },
    voltarEtapa() {
      console.log("asd");
      if (this.etapa == 2) this.$emit("update-diretor", this.usuario, -1);
      else this.$emit("update-dirigente", this.usuario, -1);
    },
  },
  watch: {
    etapa() {
      this.usuario = this.user;
    },
  },
};
</script>

<style lang="stylus"></style>
