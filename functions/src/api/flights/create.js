const express = require("express");
const crypto = require('crypto');
const { db } = require('../../config/admin')
const fs = require("fs");
const {
  validateMarket,
  validateLocale,
  validateCurrency,
  validateIata,
  validateEntity, 
  validateQueryLegs,
  validateDate,
  validateCabin,
  validateTravelers,
} = require("../../services/flightsValidation");
 

const createRouter = express.Router();


createRouter.post("/flights/live/search/create", async (req, res) => {
  const { query } = req.body;
console.log("query:", query);
console.log("market:", query.market );
console.log("locale:", query.locale);
console.log("currency:", query.currency);










  if (!query) {
    return res.status(400).json({ code: 3, message: "The currency is missing\nThe locale is missing\nThe market is missing\nThe query leg list must contain at least 1 leg\nThe number of adults must be between 1 and 8\nThe cabin class is invalid",  "details": [] });
  }


  if ( !query.queryLegs || query.queryLegs.length === 0) {
    return res.status(400).json({ code: 3, message: "The query leg list must contain at least 1 leg" , "details": []});
  }

  const marketValidation = validateMarket(query);
  if (marketValidation.error) {
    return res
      .status(400)
      .json({
        code: marketValidation.code,
        message: marketValidation.message,
        details: [],
      });
  }

  const localeValidation = validateLocale(query);
  if (localeValidation.error) {
    return res
      .status(400)
      .json({
        code: localeValidation.code,
        message: localeValidation.message,
        details: [],
      });
  }

  const currencyValidation = validateCurrency(query);
  if (currencyValidation.error) {
    return res
      .status(400)
      .json({
        code: currencyValidation.code,
        message: currencyValidation.message,
        details: [],
      });
  }
  // const entityValidation = validateEntity(query.queryLegs);
  // if (entityValidation.error) {
  //   return res
  //     .status(400)
  //     .json({
  //       code: entityValidation.code,
  //       message: entityValidation.message,
  //       details: [],
  //     });
  // }

  // const iataValidation = validateIata(query.queryLegs);
  // if (iataValidation.error) {
  //   return res
  //     .status(400)
  //     .json({
  //       code: iataValidation.code,
  //       message: iataValidation.message,
  //       details: [],
  //     });
  // }

const validationResult = validateQueryLegs(query.queryLegs);
if (validationResult.error) {
    return res.status(400).json({
        code: validationResult.code,
        message: validationResult.message,
        details: [],
    });
}


  const dateValidation = validateDate(query.queryLegs);
  if (dateValidation.error) {
    return res
      .status(400)
      .json({
        code: dateValidation.code,
        message: dateValidation.message,
        details: [],
      });
  }

  const travelersValidation = validateTravelers(query);
  if (travelersValidation.error) {
    return res
      .status(400)
      .json({
        code: travelersValidation.code,
        message: travelersValidation.message,
        details: [],
      });
  }

  const cabinValidation = validateCabin(query);
  if (cabinValidation.error) {
    return res
      .status(400)
      .json({
        code: cabinValidation.code,
        message: cabinValidation.message,
        details: [],
      });
  }

  
//Genearting the random session token
  function generateSessionToken() {
      // Generate a random 48-byte binary buffer
      const buffer = crypto.randomBytes(30);
      // Convert the binary data to a base64 encoded string
      const token = buffer.toString('base64');
      // Replace any '+' and '/' characters to make the string URL-safe
      return token.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  const sessionToken = generateSessionToken();
  // console.log('Session Token:', sessionToken);
  
//connecting firebase firestore databse
  try {
    // const uniqueId = Date.now().toString();
    // console.log('uniqueId:',uniqueId); //1714476314120
    await db.collection("flight_details").doc(sessionToken).create({
      // id: uniqueId,
      token : sessionToken ,
      market: query.market,
      locale: query.locale,
      currency: query.currency,
    });
    return res.status(200).send({
      // id: uniqueId ,
      sessionToken : sessionToken,
      status: "RESULT_STATUS_INCOMPLETE",
      action: "RESULT_ACTION_REPLACED",
    });
  }
   catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Error",
      msg: "Failed to read data",
    });
  }


  try {
    // const resultJson = await readDataFromFile("./src/data/create.json");
    res.status(200).send({
      status: "Succes !",
      msg: "RESULT_STATUS_INCOMPLETE",
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Failed to read data" });
  }
});

//used to read the json file
function fsReadFileSynchToArray(filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

module.exports = createRouter;
