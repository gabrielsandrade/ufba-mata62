import Vue from "vue";
import Router from "vue-router";
import Authentication from "@/components/Authentication/Authentication";
import Funcionarios from "@/components/Funcionarios/Funcionarios";
import Header from "@/components/Header/Header";
import Cursos from "@/components/Cursos/Cursos";
import Instituicoes from "@/components/Instituicoes/Instituicoes";
import Solicitacoes from "@/components/Solicitacoes/Solicitacoes";
import Home from "@/components/Home/Home";

Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Login", component: Authentication },
    {
      path: "/home",
      name: "Home",
      component: Header,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "cursos",
          component: Cursos,
        },
        {
          path: "instituicoes",
          component: Instituicoes,
        },
        {
          path: "usuarios",
          component: Funcionarios,
        },
        {
          path: "solicitacoes",
          component: Solicitacoes,
        },
      ],
    },
  ],
});

export default router;
