const currencyData = require("../../data/currencies.json").currencies;

function validateCurrency(query) {
  //############ CURRENCY ####################
  const currencyCode = query.currency;
  // console.log("currencyCode :", currencyCode);
  if (!currencyCode) {
    return { error: true, code: 3, message: "The currency is missing" };
  }
  //checking the Currency Code present in the currencies.json file
  const currencyExist = currencyData.some(
    (currency) => currency.code === currencyCode
  );
  // console.log("currencyExist :", currencyExist);
  if (!currencyExist) {
    return { error: true, code: 3, message: "The currency is invalid" };
  }

  return { error: false }; //Indicates the currency is valid
}
module.exports = validateCurrency;
