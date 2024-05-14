const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/core/routes");

//Main App
const app = express();
app.use(cors({ origin: true })); //This will allow cors sharing for the APIs
app.use(bodyParser.json());

// Importing configured routes
app.use(routes);

//Firebase service code
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// Export the app to Firebase Cloud Functions
exports.app = onRequest(app);
