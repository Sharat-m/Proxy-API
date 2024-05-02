const express = require("express");

const getRouter = express.Router();

getRouter.get("/", (req, res) => {
    return res.status(200).send("Hello From firebase Function !");
  });

module.exports = getRouter;


