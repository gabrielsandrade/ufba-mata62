const express = require("express");
const {
  sequelize,
  Usuario,
  Funcionario,
  Instituicao,
  Curso,
  Gestao,
} = require("./database/connection");
const moment = require("moment");
const SessionController = require("./controllers/SessionController");
// const CollegeController = require("./controllers/CollegeController");
const UserController = require("./controllers/UserController");
const { get } = require("./controllers/CollegeController");
const { Router } = require("express");
const user = require("./models/usuario");
const CollegeController = require("./controllers/CollegeController");

function getTimeNow() {
  return moment().format("h:mm:ss, DD/MM/YYYY");
}

const routes = express.Router();

routes.post("/login", SessionController.login);
routes.post("/logout", SessionController.logout);

routes.post("/instituicao/inicial", CollegeController.cadastroInicial);

// routes.get("/instituicao", CollegeController.get);
// routes.post("/instituicao", CollegeController.create);

routes.get("/user", UserController.getFuncionarios);
routes.delete("/user", UserController.deleteFuncionarios);
routes.post("/user", UserController.createLogin);

// routes.get("/teste", (req, res) => {
//   let query = "SHOW COLUMNS FROM funcionarios";
//   query = "SELECT @@auto_increment_increment = 1;";
//   connection.query(query, function (err, rows) {
//     return res.json({ data: rows });
//   });
// });
routes.post("/teste", (req, resp) => {
  Instituicao.findOne({
    where: {
      nome_instituicao: "UFBA",
    },
  }).then((user) => {
    console.log(user);
    return resp.json({ data: user });
  });
});
module.exports = routes;
