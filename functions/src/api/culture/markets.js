const express = require("express");
const marketsData = require("../../data/markets.json"); 

const marketsRouter = express.Router();
// Route to get geographic data
marketsRouter.get("/markets/locale", (req, res) => {
  try {
    res.status(200).send(marketsData);
  } catch (error) {
    console.error(error); // Good practice to log the error
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = marketsRouter;