require("dotenv").config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASS,
  dbPort: process.env.DB_PORT || 5432,

  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
};