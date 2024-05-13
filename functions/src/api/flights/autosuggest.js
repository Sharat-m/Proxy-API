const express = require("express");
const validateRequest = require("../../services/auto-suggest/validate-request");
const autoRouter = express.Router();

autoRouter.post("/autosuggest/flights", (req, res) => {
  const { query } = req.body;
  // const searchTerm = query.searchTerm;
  // const market = query.market;
  // const locale = query.locale;
  // const { market, locale, searchTerm } = req.body.query;
  const { market, searchTerm } = req.body.query;
  let limit = req.body.limit;
  // console.log(limit);

  //validating all the request getting response
  const validationResult = validateRequest(query, limit);
  if (validationResult.error) {
    return res.status(400).json({
      errors: validationResult.errors,
    });
  }

  try {
    const autoJson = require("../../data/autosuggestion.json");
    // console.log("autoJson:" , autoJson);
    // Filter logic to get the searchterm based on market and country name and name

    //Response is based on Market and searchTerm
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
          // console.log("searchTermLength:", searchTermLength);
          let startIndex = 0;
          while (
            (startIndex = lowerText.indexOf(
              searchTerm.toLowerCase(),
              startIndex
            )) !== -1
          ) {
            const endIndex = startIndex + searchTermLength;
            // console.log("endIndex:", endIndex);
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
      // returning places and highlighting
      return { ...place, highlighting };
    });

    res.json({ places: response });
  } catch (error) {
    // console.log("error:", error);
    if (!res.headersSent) {
      // Check if headers have not been sent
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = autoRouter;
