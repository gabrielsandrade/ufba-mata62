const Api = require("./api.js");
const api = Api.default;
module.exports = {
  checkNomeDaInstituicao(nome_instituicao) {
    console.log(api);
    return new Promise((resolve, reject) => {
      api
        .post("/instituicao/check", {
          nome_instituicao: nome_instituicao,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  checkNomeDoUsuario(usuario) {
    console.log(usuario);
    return new Promise((resolve, reject) => {
      api
        .post("/user/check", {
          usuario: usuario,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
