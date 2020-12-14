<template>
  <div>
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
                    v-model="instituicao.nome_instituicao"
                    :rules="nomeRules"
                    @keyup="nomeEmUso = false"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :rules="
                      $v.instituicao.mantenedora_nome.$invalid
                        ? ['Campo obrigatório']
                        : []
                    "
                    label="Nome da manenedora"
                    required
                    v-model="instituicao.mantenedora_nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :rules="
                      $v.instituicao.mantenedora_cnpj.$invalid
                        ? ['Campo obrigatório']
                        : []
                    "
                    label="CNPJ da mantenedora"
                    v-model="instituicao.mantenedora_cnpj"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :rules="
                      $v.instituicao.rua.$invalid ? ['Campo obrigatório'] : []
                    "
                    label="Rua"
                    required
                    v-model="instituicao.rua"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="CEP"
                    :rules="
                      $v.instituicao.cep.$invalid ? ['Campo obrigatório'] : []
                    "
                    required
                    v-model="instituicao.cep"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :rules="
                      $v.instituicao.cidade.$invalid
                        ? ['Campo obrigatório']
                        : []
                    "
                    label="Cidade"
                    required
                    v-model="instituicao.cidade"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :rules="
                      $v.instituicao.bairro.$invalid
                        ? ['Campo obrigatório']
                        : []
                    "
                    label="Bairro"
                    required
                    v-model="instituicao.bairro"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :rules="
                      $v.instituicao.estado.$invalid
                        ? ['Campo obrigatório']
                        : []
                    "
                    label="Estado"
                    required
                    v-model="instituicao.estado"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :rules="
                      $v.instituicao.credenciamento.$invalid
                        ? ['Campo obrigatório']
                        : []
                    "
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
            <v-btn color="blue darken-1" text @click="next" :loading="loading">
              {{ editing ? "Salvar" : "Próximo" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { checkNomeDaInstituicao } from "../../../services/CheckAvailability";
import AuthenticationServices from "../../../services/AuthenticationServices";
export default {
  name: "ModalInstituicao",
  data: () => {
    return {
      nomeOriginal: null,
      loading: false,
      dialog: false,
      nomeEmUso: false,
      editing: false,
      instituicao: {
        nome_instituicao: null,
        mantenedora_nome: null,
        mantenedora_cnpj: null,
        credenciamento: null,
        cep: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
        status: "Ativa",
      },
    };
  },
  validations() {
    return {
      // nome_original: null,
      instituicao: {
        nome_instituicao: { required },
        mantenedora_nome: { required },
        mantenedora_cnpj: { required },
        credenciamento: { required },
        cep: { required },
        rua: { required },
        bairro: { required },
        cidade: { required },
        estado: { required },
        status: { required },
      },
    };
  },
  methods: {
    edit(instituicao) {
      AuthenticationServices.editarInstituicao(instituicao).then(() => this.reset());
    },
    reset() {
      this.instituicao.nome_instituicao = null;
      this.instituicao.mantenedora_nome = null;
      this.instituicao.mantenedora_cnpj = null;
      this.instituicao.credenciamento = null;
      this.instituicao.cep = null;
      this.instituicao.rua = null;
      this.instituicao.bairro = null;
      this.instituicao.cidade = null;
      this.instituicao.estado = null;
      this.instituicao.status = "Ativa";
      this.dialog = false;
    },
    next() {
      this.loading = true;
      console.log(this.editing);
      if (this.editing) {
        this.edit(this.instituicao);
        return;
      }
      checkNomeDaInstituicao(this.instituicao.nome_instituicao)
        .then(() => {
          this.$root.$emit("first-user", { instituicao: this.instituicao });
          this.dialog = false;
        })
        .catch(() => {
          this.nomeEmUso = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    nomeRules() {
      let rules = [];
      if (!this.instituicao.nome_instituicao) rules.push("Campo obrigatório");
      if (
        this.editing &&
        this.instituicao.nome_instituicao == this.nomeOriginal
      )
        return rules;
      if (this.nomeEmUso) rules.push("Nome já está em uso");
      console.log(rules);
      return rules;
    },
  },
  created() {
    this.$root.$root.$on("reset", () => {
      this.reset();
    });
    this.$root.$root.$on("edit", () => {
      this.edit();
    });
  },
};
</script>
