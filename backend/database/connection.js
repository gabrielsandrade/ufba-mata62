var mysql = require("mysql");
let db_config = {
  host: "us-cdbr-east-02.cleardb.com",
  user: "bac4d235cf4513",
  password: "c0804966",
  database: "heroku_17cf3f553d07028",
};
var connection;

connection = mysql.createPool(db_config);

module.exports = connection;
