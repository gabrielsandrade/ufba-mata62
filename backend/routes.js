const express = require("express");
const connection = require("./database/connection");
const moment = require("moment");
const SessionController = require('./controllers/SessionController');

function getTimeNow() {
  return moment().format("h:mm:ss, DD/MM/YYYY");
}

const routes = express.Router();

routes.post("/login", SessionController.login);
routes.post("/logout", SessionController.logout);

routes.get("/teste", (req, res) => {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).send();
  }
  connection.query("SHOW tables", function (err, tables) {
    console.log(tables);
  });

  console.log(req.session.user);
  res.end("");
});

routes.post("/", (req, res) => {
  res.send("Fez um request post");
  let sess = req.session;
  console.log(sess);
  console.log("Post");
});


module.exports = routes;
