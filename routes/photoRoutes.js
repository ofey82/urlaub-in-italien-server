const express = require('express');
const multer = require('multer');
const photoController = require('../controllers/photoController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/:tripId', upload.array('photo'), photoController.uploadPhotos);


module.exports = router;





