const express = require("express");
const connection = require("./database/connection");

const routes = express.Router();

routes.get("/", (req, res) => {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).send();
  }
  let sess = req.session;
  console.log(sess);
  res.send("Hello World!");
  console.log("Deu certo");
});

routes.post("/login", (req, res) => {
  let sess = req.session;
  senha = req.body.senha;
  connection.query(
    "SELECT * FROM users where users_user = '" + req.body.user + "' LIMIT 1",
    function (err, row, field) {
      if (!!err) {
        console.log("ERRO DE CONEXÃO");
        console.log(err);
      } else {
        if (row.length && row[0].users_senha == senha) {
          req.session.user = req.body.user;
          console.log(sess);
          res.end("Login correto.");
          console.log("Login realizado com o usuário : ", req.body.user);
          req.session.name = req.body.user;
          return;
        } else {
          return res.status(403).json({ error: "Login ou senha inválidos" });
        }
      }
    }
  );
});

routes.get("/teste", (req, res) => {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).send();
  }
  console.log(req.session.user);
  res.end("");
});

routes.post("/", (req, res) => {
  res.send("Fez um request post");
  let sess = req.session;
  console.log(sess);
  console.log("Post");
});

routes.post("/logout", (req, res) => {
  req.session.destroy();
  console.log("Destruiu a sessão");
  res.send("Destruiu a sessão");
  // let sess = req.session;
  // console.log(sess);
});

module.exports = routes;
