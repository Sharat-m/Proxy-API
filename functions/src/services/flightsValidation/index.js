const validateMarket = require("./validateMarket");
const validateLocale = require("./validateLocale");
const validateCurrency = require("./validateCurrency");
const validateIata = require("./validIata");
const validateDate = require("./validateDate");
const validateCabin = require("./validateCabin");
const validateTravelers = require("./validateTravelers");
const validateEntity = require("./validateEntity");
const validateQueryLegs = require("./validateQueryLegs");

module.exports = {
  validateMarket,
  validateLocale,
  validateCurrency,
  validateIata,
  validateEntity,
  validateQueryLegs,
  validateDate,
  validateCabin,
  validateTravelers,
};
