const localesData = require("../../data/locales.json").locales;

//############ LOCALE ####################
function validateLocale(query) {
  const errors = [];
  const localeCode = query.locale;
  // console.log("localeCode:", localeCode);
  //checking if locale is provided and is not emepty
  if (localeCode === undefined || localeCode === null) {
    errors.push("query.locale must not be null");
    errors.push("query.locale must not be empty");
  } else if (localeCode.trim() === "") {
    errors.push("query.locale must not be empty");
  }

  //checking the locale code present in the locale json file
  const localeExist = localesData.some((locale) => locale.code === localeCode);
  // console.log("localeExist:", localeExist);
  if (localeCode && !localeExist) {
    errors.push("Locale code is invalid");
  }
  if (errors.length > 0) {
    return { error: true, errors };
  }

  return { error: false }; //Indicates the market is valid
}

module.exports = validateLocale;
