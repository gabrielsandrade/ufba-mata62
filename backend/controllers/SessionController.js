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

    return Usuario.findOne({
      where: {
        usuario: usuario,
      },
    }).then((user) => {
      console.log(user);
      if (!user) {
        console.log("parei aqui");
        return response
          .status(401)
          .json({ error: "Usuário ou senha inválidos", code: 1 });
      } else if (senhaCryp == user.senha) {
        return Funcionario.findOne({
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
              if (instituicao.status === "pendente") {
                return response.status(200).json({
                  error: "Sua instituição ainda não foi aprovada na plataforma",
                  code: 0,
                });
              } else {
                console.log(funcionario);
                request.session.id_instituicao = funcionario.id_instituicao;
                request.session.usuario = usuario;
                return response.json({
                  usuario: usuario,
                  nome_usuario: funcionario.nome_funcionario,
                  id_instituicao: instituicao.id_instituicao,
                  login_time: date,
                  validadora: instituicao.eh_validadora,
                  cargo: funcionario.cargo,
                });
              }
            });
          })
          .catch((err) => {
            return response.status(401).json({ error: err });
          });
      } else
        return response
          .status(401)
          .json({ error: "Usuário ou senha inválidos", code: 1 });
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
