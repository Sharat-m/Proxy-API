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
    !query.queryLegs[0].destinationPlaceId ||
    !query.adults ||
    !query.childrenAges
  ) {
    return res
      .status(400)
      .json({ status: "Failed", message: "Invalid request data" });
  }

  const marketValidation = validateMarket(query);
  if (marketValidation.error) {
    return res
      .status(400)
      .json({ status: "Failed", message: marketValidation.message });
  }

  const localeValidation = validateLocale(query);
  if (localeValidation.error) {
    return res
      .status(400)
      .json({ status: "Failed", message: localeValidation.message });
  }

  const currencyValidation = validateCurrency(query);
  if (currencyValidation.error) {
    return res
      .status(400)
      .json({ status: "Failed", message: currencyValidation.message });
  }

  const dateValidation = validateDate(query.queryLegs);
  if (dateValidation.error) {
    return res
      .status(400)
      .json({ ststus: "Failed", message: dateValidation.message });
  }

  const travelersValidation = validateTravelers(query);
  if (travelersValidation.error) {
    return res
      .status(400)
      .json({ status: "Failed", message: travelersValidation.message });
  }

  const cabinValidation = validateCabin(query);
  if (cabinValidation.error) {
    return res
      .status(400)
      .json({ status: "Failed", message: cabinValidation.message });
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
