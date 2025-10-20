const {sequelize, DataTypes} = require("index.js") 

      const User = sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: DataTypes.STRING
      }, {});

      return User;
module.exports = User;