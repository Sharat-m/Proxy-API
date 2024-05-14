const validateMarket = require("./validate-market");
const validateLocale = require("./validate-locale");
const validateCurrency = require("./validate-currency");
const validateQueryLegs = require("./validate-queryLegs");
const validateTravelers = require("./validate-travelers");
const validateCabin = require("./validate-cabin");
const validateDate = require("./validate-date");

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

  if (!query.queryLegs || !Array.isArray(query.queryLegs) || query.queryLegs.length === 0) {
    errors.push("The query leg list must contain at least 1 leg");
  } else {
    // Validate query legs
    const queryLegsResult = validateQueryLegs(query.queryLegs);
    if (queryLegsResult.error) {
      errors = errors.concat(queryLegsResult.message.split("\n"));
    }
    //validate date
    const dateResult = validateDate(query.queryLegs);
    if (dateResult.error) {
      errors.push(dateResult.message);
    }
  }

  //validate travellers
  const travelersResult = validateTravelers(query);
  // console.log("travelersResult",travelersResult);
  if (travelersResult.error) {
    errors.push(travelersResult.message);
  }

  // console.log(errors);

  //validate cabinclass
  const cabinResult = validateCabin(query);
  if (cabinResult.error) {
    errors.push(cabinResult.message);
  }

  const errorMessage = errors.join("\n");
  return errorMessage
    ? { error: true, code: 5, message: errorMessage }
    : { error: false };
}

module.exports = validateRequest;
