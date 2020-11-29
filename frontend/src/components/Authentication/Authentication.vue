<template>
  <div class="auth d-flex justify-end">
    <div class="auth-content">
      <v-tabs fixed-tabs v-model="tab">
        <v-tab>Login</v-tab>
        <v-tab>Sign Up</v-tab>
      </v-tabs>
      <div>
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
  height: 100vh;

  .auth-content {
    width: 500px;
    height: 100vh;
  }
}
</style>
