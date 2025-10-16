const {Sequelize, DataTypes} = require("sequelize")
const sequelize = new Sequelize('database', 'username', 'password'{
  host: 'localhost',
  dialect: ''
});

module.exports = {sequelize, DataTypes};