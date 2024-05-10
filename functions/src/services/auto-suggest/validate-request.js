const validateMarket = require("./validate-market");
const validateLocale = require("./validate-locale");
const validatelimit = require("./validate-limit");

function validateRequest(query, limit) {
  const errors = [];

  const marketValidation = validateMarket(query);
  if (marketValidation.error) {
    errors.push(...marketValidation.errors);
  }

  // Validating the Auto Suggest Locale
  const localeValidation = validateLocale(query);
  if (localeValidation.error) {
    errors.push(...localeValidation.errors);
  }

  const limitValidation = validatelimit(limit);
  if (limitValidation.error) {
    errors.push(...limitValidation.errors);
  }
  return errors.length > 0 ? { error: true, errors } : { error: false };
}

module.exports = validateRequest;
