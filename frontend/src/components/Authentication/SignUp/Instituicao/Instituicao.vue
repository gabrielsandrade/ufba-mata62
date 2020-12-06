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
            :rules="nomeRules"
            @keyup="nomeEmUso = false"
          ></v-text-field>
        </v-card>
        <p class="ma-0 text-left blue-grey--text">ENDEREÇO</p>
        <v-card elevation="0">
          <v-text-field
            :rules="$v.inst.cep.$invalid ? ['Campo obrigatório'] : []"
            v-model="inst.cep"
            label="CEP"
          ></v-text-field>
        </v-card>
        <v-text-field
          :rules="$v.inst.rua.$invalid ? ['Campo obrigatório'] : []"
          v-model="inst.rua"
          label="Rua"
        ></v-text-field>
        <v-card elevation="0" class="d-flex">
          <v-text-field
            :rules="$v.inst.numero.$invalid ? ['Campo obrigatório'] : []"
            v-model="inst.numero"
            label="Número"
            class="mr-4"
          ></v-text-field>
          <v-text-field
            :rules="$v.inst.bairro.$invalid ? ['Campo obrigatório'] : []"
            v-model="inst.bairro"
            label="Bairro"
          ></v-text-field>
        </v-card>
        <v-card elevation="0" class="d-flex">
          <v-text-field
            :rules="$v.inst.cidade.$invalid ? ['Campo obrigatório'] : []"
            v-model="inst.cidade"
            label="Cidade"
            class="mr-4"
          ></v-text-field>
          <v-text-field
            :rules="$v.inst.estado.$invalid ? ['Campo obrigatório'] : []"
            v-model="inst.estado"
            label="Estado"
          ></v-text-field>
        </v-card>
      </div>
      <div class="d-flex justify-end align-center mt-8">
        <v-btn
          color="info mb-2"
          type="submit"
          width="200px"
          :loading="loading"
          :disabled="$v.inst.$invalid"
          >Próximo</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Api from "../../../../services/api.js";
export default {
  props: ["etapa", "instituicao"],
  data: () => {
    return {
      loading: false,
      nomeEmUso: false,
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
  validations() {
    return {
      inst: {
        nome_instituicao: { required },
        cep: { required },
        rua: { required },
        numero: { required },
        bairro: { required },
        cidade: { required },
        estado: { required },
      },
    };
  },
  methods: {
    handleSubmit() {
      // if (this.$v.inst.$invalid) return;
      this.loading = true;
      Api.post("/instituicao/check", {
        nome_instituicao: this.inst.nome_instituicao,
      })
        .then((result) => {
          this.nomeEmUso = false;
          this.$emit("avancarEtapa");
          return result;
        })
        .catch(() => {
          this.nomeEmUso = true;
          console.log(this.nomeEmUso);
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    console.log(this.inst);
    console.log(this.instituicao);
    this.inst = this.instituicao;
  },
  computed: {
    nomeRules() {
      let rules = [];
      if(!this.inst.nome_instituicao) rules.push("Campo obrigatório");
      if(this.nomeEmUso) rules.push("Nome já está em uso");
      console.log(rules);
      return rules;
    }
  },
};
</script>

<style lang="stylus"></style>
