const connection = require("../database/connection");
const moment = require("moment");

function getTimeNow() {
  return moment().format("hh:mm:ss, DD/MM/YYYY");
}

module.exports = {
  get(request, response) {
    return false;
  },

  login(request, response) {
    let date = getTimeNow();
    let senha = request.body.senha;
    let user = request.body.user;
    connection.query(
      "SELECT * FROM users where users_user = '" + user + "' LIMIT 1",
      function (err, row) {
        if (!!err) {
          console.log("ERRO DE CONEXÃO COM O BANCO DE DADOS");
          console.log(err);
          return response.status(400).json({
            error: err,
          });
        }
        if (row.length && row[0].users_senha == senha) {
          request.session.user = user;
          console.log(`${user} fez login às ${date}`);
          return response.json({
            user: user,
            loginTime: date,
          });
        }
        return response.status(401).json({
          error: "Login ou senha inválidos",
        });
      }
    );
  },

  logout(request, response) {
    let user = request.session.user;
    let date = getTimeNow();
    request.session.destroy();
    console.log(`${user} fez logout às ${date}`);
    response.json({
      user: user,
    });
  },
};
