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

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required " });
  }

  try {
    const autoJson = require("../../data/autosuggestion.json");
    // console.log("autoJson:" , autoJson);
    // Filter logic
    const results = autoJson
      .filter(
        (place) =>
          market &&
          place.countryId.toUpperCase() === market.toUpperCase() &&
          (place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            place.countryName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .slice(0, limit);
    // console.log("Filtered results:", results);
    // Highlighting the matching parts in both name and hierarchy
    const response = results.map((place) => {
      let highlighting = [];

      // Function to find all occurrences of a searchTerm in a text and push their start and end indices
      const addHighlightIndices = (text, searchTerm) => {
        const lowerText = text.toLowerCase();
        const searchTermLength = searchTerm.length;
        let startIndex = 0;
        while (
          (startIndex = lowerText.indexOf(
            searchTerm.toLowerCase(),
            startIndex
          )) !== -1
        ) {
          const newHighlight = [startIndex, startIndex + searchTermLength - 1];
          // Check if this new highlight already exists to avoid duplicates
          let isDuplicate = highlighting.some(
            (h) => h[0] === newHighlight[0] && h[1] === newHighlight[1]
          );
          if (!isDuplicate) {
            highlighting.push(newHighlight);
          }
          startIndex += searchTermLength; // Move start index forward
        }
      };

      // Highlighting for 'name'
      addHighlightIndices(place.name, searchTerm);

      // Highlighting for 'hierarchy'
      addHighlightIndices(place.hierarchy, searchTerm);

      return { ...place, highlighting };
    });

    // Make sure to limit results if 'limit' is specified in the request
    if (req.body.limit) {
      response = response.slice(0, req.body.limit);
    }

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
