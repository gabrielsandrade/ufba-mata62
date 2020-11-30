<template>
  <div class="auth d-flex justify-center align-center">
    <div class="auth-content d-flex justify-center align-center">
      <div>
        <Login v-if="tab == 0" />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login/Login";
export default {
  name: "Authentication",
  data: () => {
    return {
      tab: 0,
    };
  },
  components: {
    Login,
  },
};
</script>

<style lang="scss" scoped>
.auth {
  width: 100vw;
  height: 100vh;
}
</style>
