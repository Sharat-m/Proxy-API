const express = require('express');

// Importing the route from geo.js
const geoRoutes = require('../api/culture/geo');
const localesRoutes = require('../api/culture/locales');
const currenciesRoutes = require('../api/culture/currencies')
const marketsRoutes = require('../api/culture/markets')

const router = express.Router();

// Use routes in the Express app
router.use('/api', geoRoutes);
router.use('/api/culture', localesRoutes);
router.use('/api/culture', currenciesRoutes);
router.use('/api/culture', marketsRoutes);


module.exports = router;