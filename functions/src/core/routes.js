const express = require("express");
// Use router in the Express app
const router = express.Router();
module.exports = router;
//################################testing paths############################################################################################################################
const getRouter = require("../api/testing/get");
const postRouter = require("../api/testing/create");
const idRouter = require("../api/testing/id");
const getAllRouter =  require("../api/testing/getAll");
const updateRouter = require("../api/testing/update");
const deleteRouter = require("../api/testing/delete");
const flightResultRouter = require("../api/testing/flight-results");

//###########################################testing APIS###########################################################################################################################################################
router.use("/test", getRouter);
router.use("/test", postRouter);
router.use("/test", idRouter);
router.use("/test", getAllRouter);
router.use("/test", updateRouter);
router.use("/test", deleteRouter);
router.use("/test", flightResultRouter);

//###########################################################################################################################################################

//Culture Paths
const geoRouter = require("../api/culture/geo");
const localesRouter = require("../api/culture/locales");
const currenciesRouter = require("../api/culture/currencies");
const marketsRouter = require("../api/culture/markets");
//Flights Paths
const createRouter = require("../api/flights/create");
const pollRouter = require("../api/flights/poll");
const autoRouter = require("../api/flights/autosuggest");


//Culture Paths
router.use("/api", geoRouter);
router.use("/api/culture", localesRouter);
router.use("/api/culture", currenciesRouter);
router.use("/api/culture", marketsRouter);
//Flights Paths
router.use("/api", createRouter);
router.use("/api", pollRouter);
router.use("/", autoRouter);
