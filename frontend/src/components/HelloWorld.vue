<template>
  <div class="main">
    <Header />
    <p v-if="logged">Login realizado</p>
    <p v-else>Não está logado</p>
  </div>
</template>

<script>
import Api from "../services/api.js";
import Header from "./Header/Header";
export default {
  name: "HelloWorld",
  components: {
    Header,
  },
  data: () => {
    return {
      logged: null,
    };
  },

  created() {
    console.log(localStorage);
    let data = {
      withCredentials: true,
    };
    Api.get("/teste", data)
      .then(() => {
        this.logged = true;
      })
      .catch(() => {
        this.$router.push("/");
        this.logged = false;
      });
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>