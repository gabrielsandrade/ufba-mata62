const {
  sequelize,
  Usuario,
  Funcionario,
  Instituicao,
  Curso,
  Gestao,
  RenovacaoDeCursos,
} = require("../database/connection");
const moment = require("moment");
const crypto = require("crypto");

function criptografaSenha(senha) {
  return crypto.createHash("md5").update(senha).digest("hex");
}

function getTimeNow() {
  return moment().format("hh:mm:ss, DD/MM/YYYY");
}

module.exports = {
  get(request, response) {
    return false;
  },

  login(request, response) {
    // usuario, permissão e a faculdade que ele pertence
    let date = getTimeNow();
    let usuario = request.body.user;
    console.log(usuario);
    let senha = request.body.senha;
    let senhaCryp = criptografaSenha(senha);

    Usuario.findOne({
      where: {
        usuario: usuario,
      },
    }).then((user) => {
      if (!user)
        return response
          .status(401)
          .json({ error: "Usuário ou senha inválidos" });
      if (senhaCryp == user.senha) {
        Funcionario.findOne({
          where: {
            id_funcionario: user.id_usuario,
          },
        })
          .then((funcionario) => {
            console.log(`${usuario} fez login às ${date}`);
            Instituicao.findOne({
              where: {
                id_instituicao: funcionario.id_instituicao,
              },
            }).then((instituicao) => {
              request.session.id_instituicao = funcionario.id_instituicao;
              request.session.usuario = usuario;
              console.log(funcionario);
              return response.json({
                usuario: usuario,
                nome_usuario: funcionario.nome_funcionario,
                id_instituicao: instituicao.id_instituicao,
                login_time: date,
                validadora: instituicao.eh_validadora,
                cargo: funcionario.cargo,
              });
            });
          })
          .catch((err) => {
            return response.status(401).json({ error: err });
          });
      } else
        return response
          .status(401)
          .json({ error: "Usuário ou senha inválidos" });
    });
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
