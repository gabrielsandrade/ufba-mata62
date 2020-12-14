const Api = require("./api.js");
const api = Api.default;
module.exports = {
  cadastroInicial(instituicao, diretor, dirigente) {
    return new Promise((resolve, reject) => {
      api
        .post("instituicao/inicial", {
          instituicao: instituicao,
          diretor: diretor,
          dirigente: dirigente,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editarInstituicao(instituicao) {
    console.log(instituicao);
    return new Promise((resolve, reject) => {
      api
        .post("instituicao/edit", {
          instituicao: instituicao,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
