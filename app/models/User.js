const { DataTypes } = require('sequelize') 
const sequelize = require("../config/database")
const Project = require("./Project")



      const User = sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username:{
          type: DataTypes.STRING(50),   //up to 50 characters
          allowNull: false,             //must have a value
          unique: true                  //no two users can have the same username
        } ,
        email: {
          type: DataTypes.STRING(100), //up to 100 characters
          allowNull:false,
          unique: true,
          validate:{
            isEmail: true             //ensures valid email format
          }
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            isUrl: true,        //must be a valid URL format
          },
          defaultValue:  'https://ui-avatars.com/api/?name=User+Default&background=0D8ABC&color=fff' //default image used if no avatar is selected
        }
      }, {});


module.exports = User;