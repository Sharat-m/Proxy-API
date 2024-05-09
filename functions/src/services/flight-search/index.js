const validateMarket = require("./validate-market");
const validateLocale = require("./validate-locale");
const validateCurrency = require("./validate-currency");
const validateIata = require("./validate-iata");
const validateDate = require("./validate-date");
const validateCabin = require("./validate-cabin");
const validateTravelers = require("./validate-travelers");
const validateEntity = require("./validate-entity");
const validateQueryLegs = require("./validate-queryLegs");

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
