const express = require("express");
const localesData = require("../../data/locales.json"); // Proper path to your JSON data

const localesRouter = express.Router();
// Route to get geographic data
localesRouter.get("/locales", (req, res) => {
  try {
    res.status(200).send(localesData);
  } catch (error) {
    console.error(error); // Good practice to log the error
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = localesRouter;
