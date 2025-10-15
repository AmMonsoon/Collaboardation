

module.exports = (sequelize, DataTypes) => {

      const User = sequelize.define('User', {
        id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: Datatype.STRING
      }, {});

      return User;
    };