const express = require("express");
const fs = require("fs");
const {
  validateMarket,
  validateLocale,
  validateCurrency,
  validateCabin,
  validateDate,
  validateTravelers,
} = require("../../services/flightsValidation");

const createRouter = express.Router();

createRouter.post("/flights/live/search/create", async (req, res) => {
  const { query } = req.body;

  if (
    !query ||
    !query.queryLegs ||
    query.queryLegs.length === 0 ||
    !query.queryLegs[0].originPlaceId ||
    !query.queryLegs[0].destinationPlaceId 
  ) {
    return res
      .status(400)
      .json({ code:  3, message: "Invalid request data" });
  }

  const marketValidation = validateMarket(query);
  if (marketValidation.error) {
    return res
      .status(400)
      .json({ code: marketValidation.code, message: marketValidation.message, "details": [] });
  }

  const localeValidation = validateLocale(query);
  if (localeValidation.error) {
    return res
      .status(400)
      .json({ code: localeValidation.code, message: localeValidation.message, "details": [] });
  }

  const currencyValidation = validateCurrency(query);
  if (currencyValidation.error) {
    return res
      .status(400)
      .json({ code:  currencyValidation.code, message: currencyValidation.message, "details": [] });
  }

  const dateValidation = validateDate(query.queryLegs);
  if (dateValidation.error) {
    return res
      .status(400)
      .json({ code: dateValidation.code, message: dateValidation.message, "details": [] });
  }

  const travelersValidation = validateTravelers(query);
  if (travelersValidation.error) {
    return res
      .status(400)
      .json({ code: travelersValidation.code, message: travelersValidation.message, "details": [] });
  }

  const cabinValidation = validateCabin(query);
  if (cabinValidation.error) {
    return res
      .status(400)
      .json({ code: cabinValidation.code, message: cabinValidation.message, "details": [] });
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
