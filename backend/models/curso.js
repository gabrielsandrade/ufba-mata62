module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "curso",
    {
      id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_instituicao: Sequelize.INTEGER,
      nome_curso: Sequelize.STRING,
      grau: Sequelize.STRING,
      codigo_mec: Sequelize.INTEGER,
      publicacao: Sequelize.STRING,
      publicacao_data: Sequelize.DATE,
      reconhecimento: Sequelize.STRING,
      reconhecimento_data: Sequelize.DATE,
      renovacao: Sequelize.STRING,
      renovacao_data: Sequelize.DATE,
      observacao: Sequelize.STRING,
    },
    { freezeTableName: true, timestamps: false }
  );
};
