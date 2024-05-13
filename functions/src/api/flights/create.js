const express = require("express");
const { db } = require("../../config/admin");
const { fsReadFileToJSON } = require("../../utils/fileReader");
const generateSessionToken = require("../../utils/tokenGenerate");
const {
  validateMarket,
  validateLocale,
  validateCurrency,
  validateQueryLegs,
  validateDate,
  validateCabin,
  validateTravelers,
} = require("../../services/flight-search");
const validateRequest = require("../../services/flight-search/validate-request");

const createRouter = express.Router();

// FLIGHT CREATE REQUEST API
createRouter.post("/flights/live/search/create", async (req, res) => {
  const { query } = req.body;
  // console.log("query:", query);
  // console.log("market:", query.market );
  // console.log("locale:", query.locale);
  // console.log("currency:", query.currency);

  // checking the query
  if (!query) {
    return res.status(400).json({
      code: 3,
      message:
        "The currency is missing\nThe locale is missing\nThe market is missing\nThe query leg list must contain at least 1 leg\nThe number of adults must be between 1 and 8\nThe cabin class is invalid",
      details: [],
    });
  }

  //checking the queryLegs and length
  if (!query.queryLegs || query.queryLegs.length === 0) {
    return res.status(400).json({
      code: 3,
      message: "The query leg list must contain at least 1 leg",
      details: [],
    });
  }

  const validationResults = validateRequest(query);
  if (validationResults.error) {
    return res.status(400).json({
      code: validationResults.code,
      message: validationResults.message,
      details: [],
    });
  }
  // // Validating the MARKET
  // const marketValidation = validateMarket(query);
  // if (marketValidation.error) {
  //   return res.status(400).json({
  //     code: marketValidation.code,
  //     message: marketValidation.message,
  //     details: [],
  //   });
  // }

  // Validating the LOCALE
  // const localeValidation = validateLocale(query);
  // if (localeValidation.error) {
  //   return res.status(400).json({
  //     code: localeValidation.code,
  //     message: localeValidation.message,
  //     details: [],
  //   });
  // }

  // Validating the CURRENCY
  // const currencyValidation = validateCurrency(query);
  // if (currencyValidation.error) {
  //   return res.status(400).json({
  //     code: currencyValidation.code,
  //     message: currencyValidation.message,
  //     details: [],
  //   });
  // }

  //Validating the ENTITY ID and IATA CODE
  // const queryValidation = validateQueryLegs(query.queryLegs);
  // if (queryValidation.error) {
  //   return res.status(400).json({
  //     code: queryValidation.code,
  //     message: queryValidation.message,
  //     details: [],
  //   });
  // }

  // Validating the DATE
  const dateValidation = validateDate(query.queryLegs);
  if (dateValidation.error) {
    return res.status(400).json({
      code: dateValidation.code,
      message: dateValidation.message,
      details: [],
    });
  }

  // Validating the TRAVELERS
  const travelersValidation = validateTravelers(query);
  if (travelersValidation.error) {
    return res.status(400).json({
      code: travelersValidation.code,
      message: travelersValidation.message,
      details: [],
    });
  }

  // validating the CABIN CLASS
  const cabinValidation = validateCabin(query);
  if (cabinValidation.error) {
    return res.status(400).json({
      code: cabinValidation.code,
      message: cabinValidation.message,
      details: [],
    });
  }

  //******************Connecting firebase firestore databse***************************************
  const sessionToken = generateSessionToken();
  // console.log('Session Token:', sessionToken);
  try {
    const uniqueId = Date.now().toString();
    // console.log('uniqueId:',uniqueId); //1714476314120
    await db.collection("flight_details").doc(sessionToken).create({
      id: uniqueId,
      token: sessionToken,
      market: query.market,
      locale: query.locale,
      currency: query.currency,
    });
    const jsonData = await fsReadFileToJSON("./src/data/create.json");
    return res.status(200).send({
      sessionToken: sessionToken,
      status: "RESULT_STATUS_INCOMPLETE",
      action: "RESULT_ACTION_REPLACED",
      content: jsonData,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Error",
      msg: "Failed to read data",
    });
  }
});

module.exports = createRouter;
