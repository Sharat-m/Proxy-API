const express = require("express");
const { db } = require("../../config/admin");
const { fsReadFileToJSON } = require("../../utils/fileReader");
const generateSessionToken = require("../../utils/tokenGenerate");
const {
  validateQueryLegs,
  validateDate,
} = require("../../services/flight-search");
const validateRequest = require("../../services/flight-search/validate-request");

const createRouter = express.Router();

// FLIGHT CREATE REQUEST API
createRouter.post("/flights/live/search/create", async (req, res) => {
  const { query } = req.body;
  // const queryLegsLength =req.body.queryLegs;
  console.log(query.queryLegs.length);
  // console.log("query:", query);
  // console.log("market:", query.market );
  // console.log("locale:", query.locale);
  // console.log("currency:", query.currency);

  // checking the query
  // if (!query) {
  //   return res.status(400).json({
  //     code: 3,
  //     message:
  //       "The currency is missing\nThe locale is missing\nThe market is missing\nThe query leg list must contain at least 1 leg\nThe number of adults must be between 1 and 8\nThe cabin class is invalid",
  //     details: [],
  //   });
  // }

  if (query.queryLegs.length === 1) {
    console.log("oneway");
  } else {
    console.log("Twoway");
  }

  if (!query.queryLegs || query.queryLegs.length === 0) {
    return res.status(400).json({
      code: 3,
      message: "The query leg list must contain at least 1 leg",
      details: [],
    });
  }

  // validating the Market, locale, currency, cabinclass and travellers
  const validationResults = validateRequest(query);
  if (validationResults.error) {
    return res.status(400).json({
      code: validationResults.code,
      message: validationResults.message,
      details: [],
    });
  }

  //Validating the ENTITY ID and IATA CODE
  const queryValidation = validateQueryLegs(query.queryLegs);
  if (queryValidation.error) {
    return res.status(400).json({
      code: queryValidation.code,
      message: queryValidation.message,
      details: [],
    });
  }

  // Validating the DATE
  const dateValidation = validateDate(query.queryLegs);
  if (dateValidation.error) {
    return res.status(400).json({
      code: dateValidation.code,
      message: dateValidation.message,
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
      trip: query.queryLegs.length,
    });
    let tripType = query.queryLegs.length;//checking the request is oneway or twoway
    if (tripType === 1) {
      const jsonData = await fsReadFileToJSON("./src/data/one-way-create.json");
      return res.status(200).send({
        sessionToken: sessionToken,
        status: "RESULT_STATUS_INCOMPLETE 1",
        action: "RESULT_ACTION_REPLACED",
        content: jsonData,
      });
    } else if (tripType === 2) {
      const jsonData = await fsReadFileToJSON("./src/data/two-way-create.json");
      return res.status(200).send({
        sessionToken: sessionToken,
        status: "RESULT_STATUS_INCOMPLETE 2",
        action: "RESULT_ACTION_REPLACED",
        content: jsonData,
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Error",
      msg: "Failed to read data",
    });
  }
});

module.exports = createRouter;
