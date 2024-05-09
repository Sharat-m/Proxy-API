const localesData = require("../../data/locales.json").locales;

//############ LOCALE ####################
function validateLocale(query) {
  const localeCode = query.locale;
  // console.log("localeCode:", localeCode);
  if (!localeCode) {
    return { error: true, code: 3, message: "The Locale is missing" };
  }

  //checking the locale code present in the locale json file
  const localeExist = localesData.some((locale) => locale.code === localeCode);
  // console.log("localeExist:", localeExist);
  if (!localeExist) {
    return { error: true, code: 3, message: "The locale is invalid" };
  }
  return { error: false }; //Indicates the market is valid
}

module.exports = validateLocale;
