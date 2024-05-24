const express = require("express");
const marketsData = require("../../data/markets.json"); 
const localeData = require("../../data/locales.json").locales;

const marketsRouter = express.Router();

function validateGeoLocale(locales){
  if(!locales){
    return { error: true, code: 3, message: "The locale is missing" };
  }
  const localeExist = localeData.some((locale) => locale.code === locales );
if(!localeExist) {
  return { error:true, code: 3, message: " The locale is invalid" };
}
return { error : false };

}


marketsRouter.get("/markets/:locale?", (req, res) => {
  let locales = req.params.locale;
  let validationLocale = validateGeoLocale (locales);
  if(validationLocale.error){
    return res.status(400).json({
      code: validationLocale.code,
      message: validationLocale.message,
      details:[],
    })
  }
  try {
    res.status(200).send(marketsData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = marketsRouter;