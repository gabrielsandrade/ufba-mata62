module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "funcionarios",
    {
      id_funcionario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_instituicao: Sequelize.INTEGER,
      nome_funcionario: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      cpf: Sequelize.INTEGER,
      telefone_funcionario: Sequelize.STRING,
      email_funcionario: Sequelize.STRING,
      cargo: Sequelize.STRING,
    },
    { timestamps: false }
  );
};
