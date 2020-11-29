var mysql = require("mysql");
let dbConfig = {
  host: "us-cdbr-east-02.cleardb.com",
  user: "bac4d235cf4513",
  password: "c0804966",
  database: "heroku_17cf3f553d07028",
};
var connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: "us-cdbr-east-02.cleardb.com",
    user: "bac4d235cf4513",
    password: "c0804966",
    database: "heroku_17cf3f553d07028",
  });

  connection.connect(function (err) {
    if (err) {
      console.log("Erro de conexão", err);
      setTimeout(handleDisconnect, 1000);
    } else {
      console.log("Connected!");
    }
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Conexão perdida");
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
