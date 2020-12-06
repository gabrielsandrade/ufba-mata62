<template>
  <div class="auth d-flex justify-center align-center">
    <div class="auth-content d-flex justify-center align-center">
      <div>
        <v-tabs v-model="tab" fixed-tabs>
          <v-tab>LOGIN</v-tab>
          <v-tab>CADASTRO</v-tab>
        </v-tabs>
        <Login v-if="tab == 0" />
        <SignUp v-else />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
export default {
  name: "Authentication",
  data: () => {
    return {
      tab: 0,
    };
  },
  components: {
    Login,
    SignUp,
  },
};
</script>

<style lang="scss" scoped>
.auth {
  width: 100vw;
  height: calc(100vh);
}
</style>
