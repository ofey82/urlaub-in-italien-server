const express = require('express');
const tripController = require('../controllers/tripController');
const router = express.Router();


router.post('/', tripController.createTrip);

router.get('/', tripController.getTrips);
router.get('/:tripId', tripController.getTripDetails);

router.put('/:tripId', tripController.updateTrip);
router.put('/:tripId/cover-photo', tripController.setCoverPhoto);


module.exports = router;



