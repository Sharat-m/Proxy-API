const express = require("express");

const {
  validateMarket,
  validateLocale,
} = require("../../services/auto-suggest");

const autoRouter = express.Router();

autoRouter.post("/autosuggest/flights", (req, res) => {
  const { query } = req.body;
  // const searchTerm = query.searchTerm;
  // const market = query.market;
  // const locale = query.locale;
  // const { market, locale, searchTerm } = req.body.query;
  const { market, searchTerm } = req.body.query;
  const limit = req.body.limit || 10;

  // Validating the Auto Suggest Market
  const marketValidation = validateMarket(query);
  if (marketValidation.error) {
    return res.status(400).json({
      code: marketValidation.code,
      message: marketValidation.message,
      details: [],
    });
  }

  // Validating the Auto Suggest Locale
  const localeValidation = validateLocale(query);
  if (localeValidation.error) {
    return res.status(400).json({
      code: localeValidation.code,
      message: localeValidation.message,
      details: [],
    });
  }

  // if (!searchTerm) {
  //   return res.status(400).json({ error: "Search term is required " });
  // }

  try {
    const autoJson = require("../../data/autosuggestion.json");
    // console.log("autoJson:" , autoJson);
    // Filter logic to get the searchterm based on market and country name and name
    const results = autoJson
      .filter((place) =>
        market ? place.countryId.toUpperCase() === market.toUpperCase() : true
      )
      .filter((place) =>
        searchTerm
          ? place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            place.countryName.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .slice(0, limit);
    // console.log("Filtered results:", results);

    // Highlighting the matching parts in both name and hierarchy
    const response = results.map((place) => {
      let highlighting = [];

      if (searchTerm) {
        // Function to find all occurrences of a searchTerm in a text and push their start and end indices
        const addHighlightIndices = (text) => {
          const lowerText = text.toLowerCase();
          const searchTermLength = searchTerm.length;
          let startIndex = 0;
          while (
            (startIndex = lowerText.indexOf(
              searchTerm.toLowerCase(),
              startIndex
            )) !== -1
          ) {
            const endIndex = startIndex + searchTermLength - 1;
            let isUnique = true;
            for (let range of highlighting) {
              if (range[0] === startIndex && range[1] === endIndex) {
                isUnique = false;
                break;
              }
            }
            if (isUnique) {
              highlighting.push([startIndex, endIndex]);
            }
            startIndex += searchTermLength;
          }
        };

        // Highlighting for 'name'
        addHighlightIndices(place.name);

        // Highlighting for 'hierarchy'
        addHighlightIndices(place.hierarchy);
      }
      return { ...place, highlighting };
    });

    //  limit results if 'limit' is specified in the request
    // if (req.body.limit) {
    //   response = response.slice(0, req.body.limit);
    // }

    res.json({ places: response });
  } catch (error) {
    console.log("error:", error);
    if (!res.headersSent) {
      // Check if headers have not been sent
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = autoRouter;
