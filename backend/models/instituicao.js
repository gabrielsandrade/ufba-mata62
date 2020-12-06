module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "instituicao",
    {
      id_instituicao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eh_validadora: Sequelize.BOOLEAN,
      nome_instituicao: Sequelize.STRING,
      rua: Sequelize.STRING,
      numero: Sequelize.STRING,
      bairro: Sequelize.STRING,
      cep: Sequelize.STRING,
      cidade: Sequelize.STRING,
      estado: Sequelize.STRING,
      credenciamento: Sequelize.STRING,
      mantenedora_nome: Sequelize.STRING,
      mantenedora_cnpj: Sequelize.STRING,
      status: Sequelize.STRING,
    },
    { freezeTableName: true, timestamps: false }
  );
};
