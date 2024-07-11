const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const tripRoutes = require('./routes/tripRoutes');
const photoRoutes = require('./routes/photoRoutes');
const storyRoutes = require('./routes/storyRoutes');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/trip', tripRoutes);
app.use('/api/photo', photoRoutes);
app.use('/api/story', storyRoutes);


module.exports = app;
