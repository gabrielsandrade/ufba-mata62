<template>
  <div>
    <v-form class="form mt-8" @submit.prevent="handleSubmit">
      <div class="text-center">
        <img src="logo-transparent.png" alt="Company logo" />
        <h1 class="blue-grey--text mb-8 text-center">CADASTRO</h1>
        <v-card elevation="0">
          <v-text-field
            v-model="inst.nome_instituicao"
            label="Nome da instituição"
            class="inputField"
          ></v-text-field>
        </v-card>
        <p class="ma-0 text-left blue-grey--text">ENDEREÇO</p>
        <v-card elevation="0">
          <v-text-field v-model="inst.cep" label="CEP"></v-text-field>
        </v-card>
        <v-text-field v-model="inst.rua" label="Rua"></v-text-field>
        <v-card elevation="0" class="d-flex">
          <v-text-field
            v-model="inst.numero"
            label="Número"
            class="mr-4"
          ></v-text-field>
          <v-text-field v-model="inst.bairro" label="Bairro"></v-text-field>
        </v-card>
        <v-card elevation="0" class="d-flex">
          <v-text-field
            v-model="inst.cidade"
            label="Cidade"
            class="mr-4"
          ></v-text-field>
          <v-text-field v-model="inst.estado" label="Estado"></v-text-field>
        </v-card>
      </div>
      <div class="d-flex justify-end align-center mt-8">
        <v-btn color="info mb-2" type="submit" width="200px">Próximo</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["etapa", "instituicao"],
  data: () => {
    return {
      inst: {
        nome_instituicao: null,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("avancarEtapa");
      console.log(
        this.etapa,
        this.nome,
        this.cep,
        this.rua,
        this.numero,
        this.bairro,
        this.cidade,
        this.estado
      );
    },
  },
  created() {
    console.log(this.inst);
    console.log(this.instituicao);
    this.inst = this.instituicao;
  },
};
</script>

<style lang="stylus"></style>
