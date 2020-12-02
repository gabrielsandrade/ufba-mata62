<template>
  <div class="main">
    <Header />
    <p class="info--text text-center my-4">Bem vindo(a) {{ user }}</p>
    <div class="list-cursos mx-2 px-8">
      <DataTable :items="faculdades" :headers="headers" />
    </div>
  </div>
</template>

<script>
import Api from "../services/api.js";
import Header from "./Header/Header";
import DataTable from "./DataTable/DataTable";
export default {
  name: "HelloWorld",
  components: {
    Header,
    DataTable,
  },
  data: () => {
    return {
      user: localStorage.name.toUpperCase(),
      logged: null,
      headers: [
        { text: "Faculdade", value: "name" },
        { text: "Cursos", value: "cursos" },
      ],
      faculdades: [
        {
          name: "FTC",
          cursos: 37,
        },
        {
          name: "Faculdade Ruy Barbosa",
          cursos: 40,
        },
        {
          name: "UNIJORGE",
          cursos: 54,
        },
        {
          name: "Faculdade 2 de Julho",
          cursos: 70,
        },
        {
          name: "UNIME",
          cursos: 62,
        },
        {
          name: "Faculdade Ruy Barbosa",
          cursos: 40,
        },
        {
          name: "FTC",
          cursos: 37,
        },
        {
          name: "Faculdade Ruy Barbosa",
          cursos: 40,
        },
        {
          name: "FTC",
          cursos: 37,
        },
        {
          name: "Faculdade Ruy Barbosa",
          cursos: 40,
        },
      ],
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
  .list-cursos {
    
  }
}
</style>
