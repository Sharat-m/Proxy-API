const express = require("express");
const localeData = require("../../data/locales.json").locales;
const geoData = require("../../data/geo-data.json");

const geoRouter = express.Router();

function validateGeoLocale(locales) {
  // console.log(locales);
  // let loca = locales
  // console.log("loca:",loca);
  if (!locales) {
    // console.log("Entered",loca);
    return { error: true, code: 3, message: " The locale is missing" };
  }
  const localeExist = localeData.some((locale) => locale.code === locales);
  if (!localeExist) {
    return { error: true, code: 3, message: "The locale is invalid" };
  }
  return { error: false };
}

geoRouter.get("/geo/hierarchy/flights/:locale?", (req, res) => {
  let locales = req.params.locale;
  // console.log("locales:",locales);
  let validationLocale = validateGeoLocale(locales);
  if (validationLocale.error) {
    return res.status(400).json({
      code: validationLocale.code,
      message: validationLocale.message,
      details: [],
    });
  }
  try {
    res.status(200).send(geoData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = geoRouter;
