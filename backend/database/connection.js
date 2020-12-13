const { Sequelize } = require("sequelize");
const UsuarioModel = require("../models/usuario");
const FuncionarioModel = require("../models/funcionario");
const InstituicaoModel = require("../models/instituicao");
const CursoModel = require("../models/curso");
const GestaoModel = require("../models/gestao");
const RenovacaoDeCursosModel = require("../models/renovacao_de_cursos");
var mysql = require("mysql");
let db_config = {
  host: "us-cdbr-east-02.cleardb.com",
  user: "bac4d235cf4513",
  password: "c0804966",
  database: "heroku_17cf3f553d07028",
};

const sequelize = new Sequelize(
  "heroku_17cf3f553d07028",
  "bac4d235cf4513",
  "c0804966",
  { dialect: "mysql", host: "us-cdbr-east-02.cleardb.com" }
);

const Usuario = UsuarioModel(sequelize, Sequelize);
const Funcionario = FuncionarioModel(sequelize, Sequelize);
const Instituicao = InstituicaoModel(sequelize, Sequelize);
const Curso = CursoModel(sequelize, Sequelize);
const Gestao = GestaoModel(sequelize, Sequelize);
const RenovacaoDeCursos = RenovacaoDeCursosModel(sequelize, Sequelize);
sequelize.sync().then(() => {
  console.log(`Usuario db and user table have been created`);
});

module.exports = {
  sequelize,
  Usuario,
  Funcionario,
  Instituicao,
  Curso,
  Gestao,
  RenovacaoDeCursos,
};
