var crypto = require("crypto");
const {
  sequelize,
  Usuario,
  Funcionario,
  Instituicao,
  Curso,
  Gestao,
} = require("../database/connection");
const moment = require("moment");
const { response } = require("express");

function getTimeNow() {
  return moment().format("hh:mm:ss, DD/MM/YYYY");
}

function criptografaSenha(senha) {
  return crypto.createHash("md5").update(senha).digest("hex");
}

module.exports = {
  teste(x) {
    console.log(x);
  },
  getFuncionarios(request, response) {
    console.log(request.session);
    Funcionario.findAll({
      where: {
        id_instituicao: request.session.id_instituicao,
      },
    }).then((result) => {
      console.log(result);
      response.json({ data: result });
    });
  },
  createFuncionario(params, response) {
    let nome_funcionario = params.nome;
    let id_instituicao = params.id_instituicao;
    let sobrenome = params.sobrenome;
    let cpf = params.cpf;
    let telefone_funcionario = params.telefone;
    let email_funcionario = params.email;
    let cargo = params.cargo;
    console.log("Ultima etapa");
    return Funcionario.findOrCreate({
      where: {
        nome_funcionario: nome_funcionario,
      },
      defaults: {
        id_funcionario: params.id_usuario,
        nome_funcionario: nome_funcionario,
        id_instituicao: id_instituicao,
        sobrenome: sobrenome,
        cpf: cpf,
        telefone_funcionario: telefone_funcionario,
        email_funcionario: email_funcionario,
        cargo: cargo,
      },
    }).then(function (result) {
      let user = result[0],
        created = result[1];
      console.log(user);
      if (!created) {
        return response
          .status(400)
          .json({ error: "Funcionário já cadastrado" });
      }
      console.log("Funcionário cadastrado...");
      // return response.json({ data: "success" });
      return response.json({ data: "success" });
    });
  },
  createLogin(params, response) {
    let usuario = params.email;
    let senha = criptografaSenha(params.senha);
    let permissao = params.cargo;

    return Usuario.findOrCreate({
      where: {
        usuario: usuario,
      },
      defaults: {
        usuario: usuario,
        senha: senha,
        permissao: permissao,
      },
    }).then(function (result) {
      let user = result[0],
        created = result[1];

      if (!created) {
        return response.status(400).json({ error: "Usuário já cadastrado" });
      }
      params.id_usuario = user.id_usuario;
      return module.exports.createFuncionario(params, response);
    });
  },

  createUser(request, response) {
    return module.exports.createLogin(request.body, response);
  },

  deleteFuncionarios(request, response) {
    Usuario.destroy({ truncate: true });
    Funcionario.destroy({ truncate: true });
    Instituicao.destroy({ truncate: true });
    return response.send("Todo mundo deletado");
  },

  checkName(request, response) {
    let params = request.body;
    console.log(params);
    return Usuario.findOne({
      where: {
        usuario: params.usuario,
      },
    })
      .then((result) => {
        if (result)
          return response.status(400).json({ data: "Nome já está em uso" });
        else return response.json({ data: "Nome válido" });
      })
      .catch((err) => response.json({ error: err }));
  },
  editar(request, reponse){
    return true;
  }
};
