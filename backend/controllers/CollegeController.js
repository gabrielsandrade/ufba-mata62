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
    return Instituicao.findAll().then((result) => {
      console.log(result);
      return response.json({ data: result });
    });
  },

  create(instituicao, response) {
    let validadora = instituicao.eh_validadora
      ? instituicao.eh_validadora
      : null;
    let nome_instituicao = instituicao.nome_instituicao
      ? instituicao.nome_instituicao
      : null;
    let rua = instituicao.rua ? instituicao.rua : null;
    let numero = instituicao.numero ? instituicao.numero : null;
    let bairro = instituicao.bairro ? instituicao.bairro : null;
    let cep = instituicao.cep ? instituicao.cep : null;
    let cidade = instituicao.cidade ? instituicao.cidade : null;
    let estado = instituicao.estado ? instituicao.estado : null;
    let credenciamento = instituicao.credenciamento
      ? instituicao.credenciamento
      : null;
    let mantenedora_nome = instituicao.mantenedora_nome
      ? instituicao.mantenedora_nome
      : null;
    let mantenedora_cnpj = instituicao.mantenedora_cnpj
      ? instituicao.mantenedora_cnpj
      : null;
    let status = instituicao.status ? instituicao.status : null;
    console.log(
      validadora,
      nome_instituicao,
      rua,
      numero,
      bairro,
      cep,
      cidade,
      estado,
      credenciamento,
      mantenedora_nome,
      mantenedora_cnpj,
      status
    );
    return Instituicao.findOrCreate({
      where: {
        nome_instituicao: nome_instituicao,
      },
      defaults: {
        eh_validadora: validadora,
        nome_instituicao: nome_instituicao,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado,
        credenciamento: credenciamento,
        mantenedora_nome: mantenedora_nome,
        mantenedora_cnpj: mantenedora_cnpj,
        status: status,
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

  cadastro(request, response) {
    console.log(request.body);
    return module.exports
      .create(request.body, response)
      .then((result) => console.log(result));
  },

  checkName(request, response) {
    let params = request.body;
    return Instituicao.findOne({
      where: {
        nome_instituicao: params.nome_instituicao,
      },
    })
      .then((result) => {
        if (result)
          return response.status(400).json({ data: "Nome já está em uso" });
        else return response.json({ data: "Nome válido" });
      })
      .catch((err) => response.json({ error: err }));
  },
};
