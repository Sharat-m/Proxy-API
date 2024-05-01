const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");


const admin = require("firebase-admin");
//Firebase service code
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Main App
const app = express();
app.use(cors({ origin: true })); //This will allow cors sharing for the APIs
app.use(bodyParser.json());
//Main firestore Database
const db = admin.firestore();

// Importing the route from geo.js
const geoRoutes = require('./src/api/culture/geo');

// Use routes in the Express app
app.use('/api', geoRoutes);

// Export the app to Firebase Cloud Functions
exports.app = onRequest(app);


