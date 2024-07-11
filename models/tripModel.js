const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Trip = sequelize.define('Trip', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  highlights: {
    type: DataTypes.STRING,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  participants: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('participants');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('participants', JSON.stringify(value));
    }
  },
  coverPhoto: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Trip;
