function validateCurrency(query) {
 //############ CURRENCY ####################
  const currency = query.currency;
  if (!currency) {
    return { error: true, code: 3, message: "The currency is missing" }
  }
  return { error: false }; //Indicates the currency is valid
}
module.exports = validateCurrency;