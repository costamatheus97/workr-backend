const Sequelize = require('sequelize')

const TechSchema = {
    schema: {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        tech_name: {
          type: Sequelize.STRING,
          required: true,
        }
      },
    options: {
        //opcoes para base existente
        tableName: 'TB_TECH',
        freezeTableName: false,
        timestamps: false,

      }
}

module.exports = TechSchema