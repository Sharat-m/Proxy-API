const express = require('express');

// Importing the route from geo.js
const geoRoutes = require('../api/culture/geo');
const locales = require('../api/culture/locales');

const router = express.Router();

// Use routes in the Express app
router.use('/api', geoRoutes);
router.use('/api/culture', locales);



module.exports = router;