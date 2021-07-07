const Sequelize = require('sequelize');

const db = new Sequelize(
  'postgres://postgres:admin@localhost:5432/messenger' ||
    'postgres://localhost:5432/messenger',
  {
    logging: false,
  }
);

module.exports = db;
