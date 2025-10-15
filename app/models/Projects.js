
    module.exports = (sequelize, DataTypes) => {
      const Project = sequelize.define('Project', {
        id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        userId: DataTypes.INTEGER
      }, {});
      
      return Project;
    };