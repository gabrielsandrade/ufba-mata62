<template>
  <v-card
    class="form-card d-flex justify-center fill-height"
    elevation="0"
    flat
  >
    <v-form class="form mt-8">
      <div class="mt-8">
        <h1 class="info--text mb-8">Login</h1>
        <v-text-field v-model="user" label="Usuário"></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (showPassword = !showPassword)"
          :type="showPassword ? 'password' : 'text'"
        ></v-text-field>
      </div>
      <div class="d-flex justify-space-between flex-column align-center mt-8">
        <v-btn color="success mb-2" :disabled="!minLenght" width="200px">LOGIN</v-btn>
        <a href="/"> Esqueceu a senha ?</a>
      </div>
    </v-form>
  </v-card>
</template>

<script>
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
