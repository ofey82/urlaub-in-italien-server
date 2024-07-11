const { Story, Photo, Trip } = require('../models/associations');

exports.createStory = async (req, res) => {
  const { title, text, photos } = req.body;
  const { tripId } = req.params;

  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const story = await Story.create({ title, text, TripId: trip.id });

    if (photos && photos.length > 0) {
      const photoInstances = await Photo.findAll({
        where: {
          id: photos
        }
      });
      await story.addPhotos(photoInstances);
    }

    const fullStory = await Story.findByPk(story.id, {
      include: [
        {
          model: Photo,
          through: { attributes: [] }
        }
      ]
    });

    res.json(fullStory);

  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ error: 'An error occurred while creating the story' });
  }
};

exports.updateStory = async (req, res) => {
  const { storyId } = req.params;
  const { title, text } = req.body;

  try {
    const story = await Story.findByPk(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    story.title = title;
    story.text = text;
    await story.save();

    res.json(story);
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getStoryDetails = async (req, res) => {
  const { storyId } = req.params;
  const story = await Story.findByPk(storyId, {
    include: {
      model: Photo,
      through: {
        attributes: [] // Optional, um die Zwischentabelle-Attribute auszublenden
      }
    }
  });
  res.json(story);
};

//
// exports.createStory = async (req, res) => {
//   const { tripId } = req.params;
//   const { title, text, photos } = req.body;
//
//   try {
//     // Erstelle die Story
//     const story = await Story.create({ title, text, TripId: tripId });
//
//     // Überprüfe, ob `photos` ein Array von IDs ist
//     if (Array.isArray(photos) && photos.length > 0) {
//       // Finde die Photo-Instanzen basierend auf den IDs
//       const photoInstances = await Photo.findAll({ where: { id: photos } });
//
//       // Füge die Fotos zur Story hinzu
//       await story.addPhotos(photoInstances);
//     }
//
//     // Aktualisiere die Trip-Daten
//     const updatedTrip = await Trip.findByPk(tripId, {
//       include: [Story, Photo]
//     });
//
//     res.json(updatedTrip);
//   } catch (error) {
//     console.error('Error creating story:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
