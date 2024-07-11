const { Story, Photo, Trip } = require('../models/associations');
const path = require('path');

exports.uploadPhotos = async (req, res) => {
  const { tripId } = req.params;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    const photos = await Promise.all(
        req.files.map(file => Photo.create({ url: path.join('uploads', file.filename), TripId: tripId }))
    );

    const updatedTrip = await Trip.findByPk(tripId, {
      include: [
        { model: Photo },
        { model: Story, include: [Photo] }
      ]
    });

    res.json(updatedTrip);
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ error: 'An error occurred while uploading photos' });
  }
};
