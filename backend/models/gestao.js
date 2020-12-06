module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "gestao",
    {
      id_gestao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_funcionario: Sequelize.INTEGER,
      inicio: Sequelize.DATE,
      date: Sequelize.DATE,
    },
    { freezeTableName: true, timestamps: false }
  );
};
