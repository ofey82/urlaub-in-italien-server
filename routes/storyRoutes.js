const express = require('express');
const storyController = require('../controllers/storyController');
const router = express.Router();


router.post('/:tripId', storyController.createStory);

router.get('/:storyId', storyController.getStoryDetails);

router.put('/:storyId', storyController.updateStory);


module.exports = router;
