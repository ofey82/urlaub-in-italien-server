const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Trip = require('./tripModel');
const Photo = require('./photoModel');

const Story = sequelize.define('Story', {
  title: DataTypes.STRING,
  text: DataTypes.TEXT,
  TripId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Trips',
      key: 'id'
    }
  }
});

module.exports = Story;
