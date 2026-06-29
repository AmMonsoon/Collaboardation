const { Sequelize } = require("sequelize")
const config = require('./config')

//create the connection to database
const useSSL = process.env.DB_SSL === "true"
const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    port: config.dbPort,
    dialect: "postgres",
    logging: false,
    dialectOptions: useSSL ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    } : {},
  }
);

//function to test database connection
async function connectDB() {
    try {
        await sequelize.authenticate()
        
    } catch (error) {
        console.error("Database connection failed!", error.message)
    }
}
//run the function to test connection
connectDB()

module.exports = sequelize;