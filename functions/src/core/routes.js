const express = require("express");

//################################testing paths############################################################################################################################
const getRouter = require("../api/testing/get");
const postRouter = require("../api/testing/create");
const idRouter = require("../api/testing/id");
const getAllRouter =  require("../api/testing/getAll");
const updateRouter = require("../api/testing/update");
const deleteRouter = require("../api/testing/delete");
const flightResultRouter = require("../api/testing/flight-results");
//###########################################################################################################################################################

// paths
//culture
const geoRouter = require("../api/culture/geo");
const localesRouter = require("../api/culture/locales");
const currenciesRouter = require("../api/culture/currencies");
const marketsRouter = require("../api/culture/markets");
//Flights
const flightRouter = require("../api/flights/flight");
const createRouter = require("../api/flights/create");

const router = express.Router();
module.exports = router;
// Use router in the Express app
//culture
router.use("/api", geoRouter);
router.use("/api/culture", localesRouter);
router.use("/api/culture", currenciesRouter);
router.use("/api/culture", marketsRouter);
//Flights
router.use("/api", flightRouter);
router.use("/api", createRouter);













//###########################################testing APIS###########################################################################################################################################################
router.use("/test", getRouter);
router.use("/test", postRouter);
router.use("/test", idRouter);
router.use("/test", getAllRouter);
router.use("/test", updateRouter);
router.use("/test", deleteRouter);
router.use("/test", flightResultRouter);

//###########################################################################################################################################################