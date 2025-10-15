
    module.exports = (sequelize, DataTypes) => {
      const Task = sequelize.define('Task', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        assignedUserId: DataTypes.INTEGER,
        boardId: DataTypes.INTEGER
      }, {});
     
      return Task;
    };