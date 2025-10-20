require('dotenv').config();

module.exports = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST,
    dbPassword: process.env.DB_PASS
}