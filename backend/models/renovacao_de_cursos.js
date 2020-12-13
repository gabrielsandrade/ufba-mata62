module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "renovacao_de_cursos",
        {
            id_renovacao_de_cursos: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_curso: Sequelize.INTEGER,
            renovacao: Sequelize.STRING,
            renovacao_data: Sequelize.DATE,
        },
        { freezeTableName: true, timestamps: false }
    );
};