const Trip = require('./tripModel');
const Photo = require('./photoModel');
const Story = require('./storyModel');

// Definiere die Beziehungen
Trip.hasMany(Photo);
Photo.belongsTo(Trip);

Trip.hasMany(Story);
Story.belongsTo(Trip);

Story.belongsToMany(Photo, { through: 'StoryPhotos' });
Photo.belongsToMany(Story, { through: 'StoryPhotos' });

module.exports = { Trip, Photo, Story };
