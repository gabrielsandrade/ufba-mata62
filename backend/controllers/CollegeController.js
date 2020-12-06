const {
  sequelize,
  Usuario,
  Funcionario,
  Instituicao,
  Curso,
  Gestao,
} = require("../database/connection");
const UserController = require("../controllers/UserController");
const moment = require("moment");

function getTimeNow() {
  return moment().format("hh:mm:ss, DD/MM/YYYY");
}

module.exports = {
  get(request, response) {
    let query = "SELECT * FROM instituicao";
    connection.query(query, function (err, row, field) {
      if (err) throw err;
      console.log(row);
      response.json(row);
    });
    return false;
  },

  create(instituicao, response) {
    let validadora = instituicao.validadora;
    let nome_instituicao = instituicao.nome_instituicao;
    let rua = instituicao.rua;
    let numero = instituicao.numero;
    let bairro = instituicao.bairro;
    let cep = instituicao.cep;
    let cidade = instituicao.cidade;
    let estado = instituicao.estado;
    let credenciamento = instituicao.credenciamento;
    let mantenedora = instituicao.mantenedora;
    return Instituicao.findOrCreate({
      where: {
        nome_instituicao: nome_instituicao,
      },
      defaults: {
        validadora: validadora,
        nome_instituicao: nome_instituicao,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado,
        credenciamento: credenciamento,
        mantenedora: mantenedora,
      },
    }).then(function (result) {
      let inst = result[0],
        created = result[1];
      if (!created) {
        return false;
      } else {
        console.log("Instituição cadastrada...");
        return inst.id_instituicao;
      }
    });
  },

  cadastroInicial(request, response) {
    request.body.instituicao.credenciamento = "teste";
    request.body.instituicao.validadora = false;
    request.body.instituicao.mantenedora = "teste";
    let diretor = request.body.diretor;
    request.body.diretor.cargo = "DIRE";
    request.body.diretor.senha = "padrao";
    let dirigente = request.body.dirigente;
    request.body.dirigente.cargo = "DIRI";
    request.body.dirigente.senha = "padrao";
    module.exports
      .create(request.body.instituicao)
      .then((id_instituicao) => {
        request.body.diretor.id_instituicao = id_instituicao;
        request.body.dirigente.id_instituicao = id_instituicao;
        UserController.createLogin(request.body.diretor, response);
        UserController.createLogin(request.body.dirigente, response).then(
          () => {
            return response.json({ data: "success" });
          }
        );
      })
      .catch(() => {
        return response
          .status(400)
          .json({ error: "Instituição já cadastrada" });
      });
  },
};
