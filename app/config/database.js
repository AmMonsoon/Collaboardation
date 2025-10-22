const { Sequelize } = require("sequelize")
const config = require('./config')

//create the connection to database
const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword, {
  host: config.dbHost,
  dialect: 'postgres'
});

//function to test database connection
async function connectDB() {
    try {
        await sequelize.authenticate()
        console.log("Database connection established successfully")
    } catch (error) {
        console.error("Database connection failed!", error.message)
    }
}
//run the function to test connection
connectDB()

module.exports = sequelize;