const validateMarket = require("./validate-market");
const validateLocale = require("./validate-locale");
const validateCurrency = require("./validate-currency");
const validateQueryLegs =  require("./validate-queryLegs");

function validateRequest(query) {
  let errors = [];

  //validate market
  const marketResult = validateMarket(query);
  if (marketResult.error) {
    errors.push(marketResult.message);
  }

  //validate locale
  const localeResult = validateLocale(query);
  if (localeResult.error) {
    errors.push(localeResult.message);
  }

  //validate currency
  const currencyResult = validateCurrency(query);
  if (currencyResult.error) {
    errors.push(currencyResult.message);
  }

  //validate queryLegs entityId and IATA code
  const queryValidation = validateQueryLegs(query.queryLegs);
  if (queryValidation.error) {
    errors.push(queryValidation.message);
  }


  const errorMessage = errors.join("\n");
  return errorMessage
    ? { error: true, code: 3, message: errorMessage }
    : { error: false };
}

module.exports = validateRequest;
