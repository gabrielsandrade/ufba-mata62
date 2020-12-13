<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              step == 1 ? "Informações sobre o diretor" : "Dirigente"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    v-model="usuario.nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nome da manenedora"
                    required
                    v-model="usuario.mantenedora_nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="CNPJ da mantenedora"
                    v-model="usuario.mantenedora_cnpj"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Rua"
                    required
                    v-model="usuario.rua"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="CEP"
                    required
                    v-model="usuario.cep"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Cidade"
                    required
                    v-model="usuario.cidade"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Bairro"
                    required
                    v-model="usuario.bairro"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Estado"
                    required
                    v-model="usuario.estado"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Credenciamento"
                    required
                    v-model="usuario.credenciamento"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="reset">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="next">
              {{ step == 1 ? "Próximo" : "Salvar" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ModalUsuario",
  data: () => {
    return {
      dialog: false,
      step: 1,
      instituicao: null,
      usuario: {
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
    };
  },
  created() {
    this.$root.$root.$on("first-user", (info) => {
      console.log(info);
      this.instituicao = info.instituicao;
      this.dialog = true;
    });
    this.$root.$root.$on("next-user", (info) => {
      this.step = 2;
      console.log(info);
      this.dialog = true;
    });
  },
  methods: {
    reset() {
      this.dialog = false;
        this.$root.$root.$emit("reset");
    },
    next() {
      console.log(this.step);
      if (this.step == 1) {
        this.dialog = false;
        this.$root.$root.$emit("next-user", {
          instituicao: this.instituicao,
          diretor: this.usuario,
        });
      }
      // this.reset();
    },
  },
};
</script>
