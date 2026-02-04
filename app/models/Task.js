const { DataTypes } = require('sequelize') 
const sequelize = require("../config/database")

      const Task = sequelize.define('Task', {
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
        description: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        position: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        boardId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Boards',
            key: 'id',
          },
        }
        }, {});

module.exports = Task;
      
      
    