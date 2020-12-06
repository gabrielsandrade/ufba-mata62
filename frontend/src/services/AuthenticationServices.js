const Api = require("./api.js");

module.exports = {
  cadastroInicial(instituicao, diretor, dirigente) {
    console.log(Api);
    Api.default.post("instituicao/inicial", {
      instituicao: instituicao,
      diretor: diretor,
      dirigente: dirigente,
    });
  },
};
