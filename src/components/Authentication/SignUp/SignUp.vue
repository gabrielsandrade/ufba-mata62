<template>
  <v-card
    class="form-card d-flex justify-center fill-height"
    elevation="0"
    flat
  >
    <v-form class="form mt-8">
      <div class="mt-8">
        <h1 class="info--text mb-8">Cadastro</h1>
        <v-text-field v-model="user" label="Usuário"></v-text-field>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (showPassword = !showPassword)"
          :type="showPassword ? 'password' : 'text'"
        ></v-text-field>
        <v-text-field
          v-model="password2"
          label="Repita a senha"
          :append-icon="!showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (showPassword2 = !showPassword2)"
          :type="showPassword2 ? 'password' : 'text'"
        ></v-text-field>
      </div>
      <div class="d-flex justify-center align-center mt-8">
        <v-btn color="info">Cadastrar</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "SignUp",
  components: {},
  data: () => ({
    user: "",
    password: "",
    email: null,
    showPassword: true,
    showPassword2: true,
  }),
  computed: {
    minLenght() {
      return this.user.length > 0 && this.password.length > 4;
    },
  },
};
</script>

<style scoped>
.form-card {
  width: 500px;
  height: calc(100vh - 48px);
  border-top-left-radius: 0%;
  /* box-shadow: 1px solid blue; */
}

.form {
  width: 400px;
}
</style>
