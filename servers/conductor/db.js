const {Sequelize} = require('sequelize')

//Экспортируем объект с конфигурацией ДБ
module.exports = new Sequelize(
    'Syntax_Analyzer',//process.env.BD_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host:  process.env.DB_HOST,
        port:  process.env.DB_PORT
    }
)
