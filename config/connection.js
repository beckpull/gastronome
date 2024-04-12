// Sets up the sequelize connection which is used to access the postgreSQL database through javascript. 
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_HOST
  ? new Sequelize(process.env.DB_HOST)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );

module.exports = sequelize;
