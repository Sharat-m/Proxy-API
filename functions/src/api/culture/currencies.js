const express = require("express");
const currenciesData = require("../../data/currencies.json"); 

const currenciesRouter = express.Router();
// Route to get geographic data
currenciesRouter.get("/currencies", (req, res) => {
  try {
    res.status(200).send(currenciesData);
  } catch (error) {
    console.error(error); // Good practice to log the error
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = currenciesRouter;
