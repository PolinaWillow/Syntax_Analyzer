const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

//Модель Text_Input
const Text_Input = sequelize.define('text_input', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    input_text: {type: DataTypes.STRING},
    file_name: {type: DataTypes.STRING},
    type_analyzer: {type: DataTypes.STRING, allowNull: false},
    partial_analyzer: {type: DataTypes.STRING},
    word_analyzer: {type: DataTypes.STRING}
});

//Модель Text_Results
const Text_Results = sequelize.define('text_results', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    result_file_name: {type: DataTypes.STRING, allowNull: false},
    statistic_file_name: {type: DataTypes.STRING, allowNull: false}
});

//Связь между моделями
Text_Input.hasMany(Text_Results)
Text_Results.belongsTo(Text_Input)

module.exports = {
    Text_Input, Text_Results
}