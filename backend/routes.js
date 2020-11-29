const express = require("express");
const connection = require("./database/connection");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Deu certo");
});

routes.post("/login", (req, res) => {
  let header = req.headers;
  senha = req.body.senha;
  connection.query(
    "SELECT * FROM users where users_user = '" + req.body.user + "' LIMIT 1",
    function (err, row, field) {
      if (!!err) {
        console.log("ERRO DE CONEXÃO");
        console.log(err);
      } else {
        if (row.length && row[0].users_senha == senha) {
          res.json({
            data: "Login correto.",
          });
          console.log("Login realizado com o usuário : ", req.body.user);
          return;
        } else {
          return res.status(403).json({ error: "Login ou senha inválidos" });
        }
      }
    }
  );
});

routes.post("/", (req, res) => {
  res.send("Fez um request post");
  console.log("Post");
});

module.exports = routes;
