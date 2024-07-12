const { Story, Photo, Trip } = require('../models/associations');

exports.getTrips = async (req, res) => {
  const trips = await Trip.findAll();
  res.json(trips);
};

exports.getTripDetails = async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findByPk(tripId, {
      include: [
        Photo,
        {
          model: Story,
          include: [Photo]
        }
      ]
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Error fetching trip details:', error);
    res.status(500).json({ error: 'An error occurred while fetching the trip details' });
  }
};

exports.createTrip = async (req, res) => {
  const trip = await Trip.create(req.body);
  res.json(trip);
};

exports.updateTrip = async (req, res) => {
  const { tripId } = req.params;
  const { title, description, startDate, endDate, participants, highlights } = req.body;

  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    trip.title = title;
    trip.description = description;
    trip.highlights = highlights;
    trip.startDate = startDate;
    trip.endDate = endDate;
    trip.participants = participants;
    await trip.save();

    res.json(trip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.setCoverPhoto = async (req, res) => {
  const { tripId } = req.params;
  const { photoId } = req.body;

  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const photo = await Photo.findByPk(photoId);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    trip.coverPhoto = photo.url;
    await trip.save();

    res.json(trip);
  } catch (error) {
    console.error('Error setting cover photo:', error);
    res.status(500).json({ error: 'An error occurred while setting the cover photo' });
  }
};
