const {Sequelize, DataTypes} = require("sequelize")

//create the connection to database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,{
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

//function to test database connection
async function connectDB() {
    try {
        await sequelize.authenticate()
        console.log("Database connection established successfully")
    } catch (error) {
        console.error("Database connection failed!", error)
    }
}
//run the function tp test connection
connectDB()

module.exports = {sequelize, DataTypes};