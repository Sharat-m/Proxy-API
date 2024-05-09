const express = require("express");

const autoJson = require('../../data/autosuggestion.json')
const {
  validateMarket,
  validateLocale,
} = require("../../services/auto-suggest");

const autoRouter = express.Router();

autoRouter.post("/autosuggest/flights", (req, res) => {
  const { query } = req.body;
  console.log("query:", query);

  console.log("autoJson:", autoJson);




  
  return res.status(200).send("Hello From auto Sugggestion!");
});

module.exports = autoRouter;



// // Validating the MARKET
// const marketValidation = validateMarket(query);
// if (marketValidation.error) {
//   return res.status(400).json({
//     code: marketValidation.code,
//     message: marketValidation.message,
//     details: [],
//   });
// }

//   // Validating the LOCALE
//   const localeValidation = validateLocale(query);
//   if (localeValidation.error) {
//     return res.status(400).json({
//       code: localeValidation.code,
//       message: localeValidation.message,
//       details: [],
//     });
//   }
