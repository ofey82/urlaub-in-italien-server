const { Story, Photo, Trip } = require('../models/associations');

exports.getTrips = async (req, res) => {
  const trips = await Trip.findAll();
  res.json(trips);
};

exports.getTripDetails = async (req, res) => {
  const { tripId } = req.params;

  const trip = await Trip.findByPk(tripId, {
    include: [Photo, Story]
  });
  res.json(trip);
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
