const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Photo = sequelize.define('Photo', {
  url: DataTypes.STRING,
  TripId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Trips',
      key: 'id'
    }
  }
});

module.exports = Photo;
