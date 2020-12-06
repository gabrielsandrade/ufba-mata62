import Vue from "vue";
import Router from "vue-router";
import Authentication from "@/components/Authentication/Authentication";
import HelloWorld from "@/components/HelloWorld";
import Funcionarios from "@/components/Funcionarios/Funcionarios";
import Header from "@/components/Header/Header";
import Cursos from "@/components/Cursos/Cursos";
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
          path: 'cursos',
          component: Cursos,
        },
        {
          path: 'instituicoes',
          component: HelloWorld,
        },
        {
          path: 'usuarios',
          component: Funcionarios,
        },
      ],
    },
  ],
});

export default router;
