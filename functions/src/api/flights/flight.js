const express = require("express");

const flightRouter = express.Router();


flightRouter.get("/flights", (req, res) => {
    return res.status(200).send("Flights Details are showned !");
  });



module.exports = flightRouter;


