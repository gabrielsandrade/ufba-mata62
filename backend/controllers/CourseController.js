const {
    sequelize,
    Usuario,
    Funcionario,
    Instituicao,
    Curso,
    Gestao,
    RenovacaoDeCursos,
  } = require("../database/connection");
  const UserController = require("../controllers/CourseController");
  const moment = require("moment");
  const { response } = require("express");
  var request = require('request'); 
  
  
  module.exports = {
    get(request, response) {
      return Curso.findAll().then((result) => {
        console.log(result);
        return response.json({ data: result });
      });
    },
  
    createCurso(request, response) {
      let params = request.body;
      console.log(params);  
      let id_instituicao = request.session.id_instituicao;
      let nome_curso = params.nome_curso;
      let grau = params.grau;
      let codigo_mec = params.codigo_mec;
      let publicacao = params.publicacao;
      let publicacao_data = params.publicacao_data;
      let reconhecimento = params.reconhecimento;
      let reconhecimento_data = params.reconhecimento_data;
      let observacao = params.observacao;
      console.log(
        id_instituicao,
        nome_curso, 
        grau,
        codigo_mec,
        publicacao,
        publicacao_data,
        reconhecimento,
        reconhecimento_data,
        observacao
      );
      return Curso.findOrCreate({
        where: {
            codigo_mec: codigo_mec, 
            id_instituicao: id_instituicao
        },
        defaults: {
          id_instituicao: id_instituicao,
          nome_curso: nome_curso, 
          grau: grau,
          codigo_mec: codigo_mec,
          publicacao: publicacao,
          publicacao_data: publicacao_data,
          reconhecimento: reconhecimento,
          reconhecimento_data: reconhecimento_data,
          observacao: observacao,
        },
      }).then(function (result) {
        let curso = result[0],
          created = result[1];
        if (!created) {
          console.log(curso);
          return response.status(400).json({"error" : "curso já existe"});
        } else {
          console.log("Curso cadastrado...");
          return response.json({data: "sucess"});
        }
      });
    },
  };