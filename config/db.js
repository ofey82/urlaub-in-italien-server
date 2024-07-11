const { Sequelize } = require('sequelize');
const { Trip, Photo, Story } = require('../models/associations');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = { sequelize };
