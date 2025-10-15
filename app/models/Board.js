
    module.exports = (sequelize, DataTypes) => {
      const Board = sequelize.define('Board', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        projectId: DataTypes.INTEGER
      }, {});
      
      return Board;
    };