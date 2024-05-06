  //############ LOCALE ####################
 
 function validateLocale(query) {
    const locale = query.locale;
    if (!locale) {
        return { error: true, code: 3, message: "The Locale is missing" }
    }
    return { error: false }; //Indicates the market is valid
 }
 
 module.exports = validateLocale;
