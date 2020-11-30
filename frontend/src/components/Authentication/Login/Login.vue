<template>
  <v-card
    class="form-card d-flex justify-center fill-height"
    elevation="0"
    flat
  >
    <v-form class="form mt-8" @submit.prevent="handleSubmit">
      <div class="">
        <img
          class="text-center"
          src="../../../assets/logo.png"
          alt="Company logo"
        />
        <h1 class="blue-grey--text mb-8 text-center">Login</h1>
        <v-text-field
          v-model="user"
          label="Usuário"
          class="inputField"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (showPassword = !showPassword)"
          :type="showPassword ? 'password' : 'text'"
          class="inputField"
        ></v-text-field>
      </div>
      <div class="d-flex justify-space-between flex-column align-center mt-8">
        <v-btn
          color="success mb-2"
          :disabled="!minLenght"
          type="submit"
          width="200px"
          >LOGIN</v-btn
        >
        <router-link to="/teste"> Esqueceu a senha ?</router-link>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import Api from "../../../services/api.js";
export default {
  name: "Login",
  components: {},
  data: () => ({
    user: "",
    showPassword: true,
    password: "",
  }),
  computed: {
    minLenght() {
      return this.user.length > 0 && this.password.length > 4;
    },
  },
  methods: {
    handleSubmit(evt) {
      console.log(evt);
      let data = {
        user: evt.target[0].value,
        senha: evt.target[1].value,
      };
      Api.post("login", data).then((response) => {
        console.log(response);
        this.$router.push("teste");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-card {
  width: 500px;
  height: 100vh;
  border-top-left-radius: 0%;
}

.form {
  max-width: 400px;
}
</style>
