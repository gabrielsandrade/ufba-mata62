<template>
  <div class="main">
    <v-row justify="center" v-if="canAdd">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="" class="my-4" dark v-bind="attrs" v-on="on">
            Adicionar Usuário
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Usuário</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    v-model="user.email"
                    :rules="nomeRules"
                    @keyup="nomeEmUso = false"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nome"
                    required
                    v-model="user.nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Sobrenome"
                    hint="example of helper text only on focus"
                    v-model="user.sobrenome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="CPF"
                    required
                    v-model="user.cpf"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Telefone"
                    required
                    v-model="user.telefone"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-col cols="12" sm="6" md="6">
              <v-select
                :items="cargos"
                label="Cargo"
                @change="select"
                v-model="user.cargo"
              >
              </v-select>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="reset">
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text @click="salvar">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="list-cursos mx-2 px-8">
      <DataTable
        :items="funcionarios"
        :headers="_headers"
        :loading="loading"
        v-on:editar="edit"
      />
    </div>
  </div>
</template>

<script>
import Api from "../../services/api.js";
import consts from "../../consts/consts.js";
import DataTable from "../DataTable/DataTable";
import { checkNomeDoUsuario } from "../../services/CheckAvailability";
export default {
  name: "HelloWorld",
  components: {
    DataTable,
  },
  data: () => {
    return {
      editing: false,
      loading: false,
      usuario: localStorage.nome.toUpperCase(),
      nomeEmUso: null,
      user: {
        nome: null,
        sobrenome: null,
        email: null,
        cpf: null,
        telefone: null,
        cargo: null,
      },
      logged: null,
      dialog: false,
      headers: [
        { text: "Nome", value: "nome", show: true },
        { text: "Sobrenome", value: "sobrenome", show: true },
        { text: "Telefone", value: "telefone", show: true },
        { text: "CPF", value: "cpf", show: true },
        { text: "Email", value: "email", show: true },
        { text: "Cargo", value: "cargo", show: true },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
          show: false,
        },
      ],
      funcionarios: [],
      cargos: [
        "Colaborador",
        "Diretor",
        "Dirigente",
        "Superintendente",
        "Coordenador do CARE",
      ],
    };
  },

  created() {
    this.loading = true;
    console.log(this.headers[this.headers.length - 1].show = this.canAdd);
      
    Api.get("/user")
      .then((response) => {
        response.data.data.forEach((usuario) => {
          let funcionario = {
            nome: usuario.nome_funcionario,
            sobrenome: usuario.sobrenome,
            telefone: usuario.telefone_funcionario,
            cpf: usuario.cpf,
            email: usuario.email_funcionario,
            cargo: this.cargoFormatted(usuario.cargo),
          };
          this.funcionarios.push(funcionario);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.loading = false));
  },
  computed: {
    canAdd() {
      return consts.CAN_ADD_USERS.includes(localStorage.cargo);
    },
    nomeRules() {
      let rules = [];
      if (!this.user.email) rules.push("Campo obrigatório");
      if (this.nomeEmUso) rules.push("Nome já está em uso");
      return rules;
    },
    _headers() {
      return this.headers.filter((h) => h.show);
    },
  },
  methods: {
    select(item) {
      console.log(item);
      console.log(this.user.cargo);
    },
    salvar(item) {
      console.log(item);
      this.loading = true;
      if (!this.editing) {
        checkNomeDoUsuario(this.user.email)
          .then(() => {
            this.nomeEmUso = false;
            this.$emit("avancarEtapa");
            this.user.senha = "password";
            this.user.id_instituicao = localStorage.id_instituicao;
            console.log(this.user.cargo);
            this.user.cargo = this.cargoFormattedReversed(this.user.cargo);
            console.log(this.user.cargo);
            Api.post("user", this.user).then((response) =>
              console.log(response)
            );
          })
          .catch(() => {
            this.nomeEmUso = true;
          })
          .finally(() => (this.loading = false));
      } else {
        console.log(this.user);
      }
    },
    cargoFormatted(cargo) {
      console.log(cargo);
      switch (cargo) {
        case "DIRE":
          return "Diretor";

        case "DIRI":
          return "Dirigente";

        case "SUPER":
          return "Superintendente";

        case "COORD":
          return "Coordenador do CARE";

        default:
          return "Colaborador";
      }
    },
    cargoFormattedReversed(cargo) {
      console.log(cargo);
      switch (cargo) {
        case "Diretor":
          return "DIRE";

        case "Dirigente":
          return "DIRI";

        case "Superintendente":
          return "SUPER";

        case "Coordenador do CARE":
          return "COORD";

        default:
          return "COL";
      }
    },
    edit(item) {
      console.log("aasd");
      this.editing = true;
      this.user.nome = item.nome;
      this.user.sobrenome = item.sobrenome;
      this.user.email = item.email;
      this.user.cpf = item.cpf;
      this.user.telefone = item.telefone;
      this.user.cargo = item.cargo;
      this.dialog = true;
    },
    save() {},
    reset() {
      this.dialog = false;
      this.editing = false;
      this.user.nome = null;
      this.user.sobrenome = null;
      this.user.email = null;
      this.user.cpf = null;
      this.user.telefone = null;
      this.user.cargo = null;
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
