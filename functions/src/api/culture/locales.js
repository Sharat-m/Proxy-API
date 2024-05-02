const express = require("express");
const localesData = require("../../data/locales.json"); 

const localesRouter = express.Router();


localesRouter.get("/locales", (req, res) => {
  try {
    res.status(200).send(localesData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = localesRouter;
