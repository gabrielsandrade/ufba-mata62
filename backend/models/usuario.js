module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "usuarios",
    {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_usuario: Sequelize.STRING,
      usuario: Sequelize.STRING,
      senha: Sequelize.STRING,
      permissao: Sequelize.STRING,
      createdAt: {
        field: "data_criacao",
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "hora_login",
        type: Sequelize.DATE,
      },
      data_exclusao: Sequelize.DATE,
    },
    { timestamps: true }
  );
};
