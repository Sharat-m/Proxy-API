const validateMarket = require("./validate-market");
const validateLocale = require("./validate-locale");
const validateCurrency = require("./validate-currency");
const validateQueryLegs = require("./validate-queryLegs");
const validateTravelers = require ("./validate-travelers");
const validateCabin = require("./validate-cabin");
const validateDate = require ("./validate-date");

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
//   const queryResult = validateQueryLegs(query.queryLegs);
//   if (queryResult.error) {
//     errors.push(queryResult.message);
//   }

  // Validating the DATE
//   const dateResult = validateDate(query.queryLegs);
//   if (dateResult.error) {
//     errors.push(dateResult.message);
//   }


  //validate travellers
  const travelersResult = validateTravelers(query);
  if (travelersResult.error) {
    errors.push(travelersResult.message);
  }
 
   //validate cabinclass
   const cabinResult = validateCabin(query);
  if (cabinResult.error) {
    errors.push(cabinResult.message);
  }

  const errorMessage = errors.join("\n");
  return errorMessage
    ? { error: true, code: 3, message: errorMessage }
    : { error: false };
}

module.exports = validateRequest;
