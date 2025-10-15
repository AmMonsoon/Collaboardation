
    module.exports = (sequelize, DataTypes) => {
      const Comment = sequelize.define('Comment', {
        id: DataTypes.INTEGER,
        text: DataTypes.STRING,
        taskId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
      }, {});
      User.associate = function(models) {
        // define associations here
      };
      return User;
    };