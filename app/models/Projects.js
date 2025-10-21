const {sequelize, DataTypes} = require("index.js")
const User = require('/Users')
    
      const Project = sequelize.define('Project', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: DataTypes.STRING(30),  //allows a title of up to 30 characters
          allowNull: false,
          validate: {             
            notEmpty: true,         //cannot be an empty string
            len: [3, 30],           //must be between 3 and 30 characters
          }
        },
        userId: {         //Foreign key linking this project to the user
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            id: 'id',
          },
          onDelete: 'CASCADE',
        }
      }, {});
      
User.hasMany(Project, {foreignKey: 'userId', onDelete: 'CASCADE'})

module.exports = Project;