const express = require("express");
const geoData = require("../../data/geo-data.json");

const geoRouter = express.Router();


geoRouter.get("/geo/hierarchy/flights/locale", (req, res) => {
  try {
    res.status(200).send(geoData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = geoRouter;
