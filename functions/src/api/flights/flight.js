const express = require("express");
const fs = require("fs");

const flightRouter = express.Router();


flightRouter.get("/flights", async (req, res) => {
    return res.status(200).send("Flights Details are showned !");
  });


//Fetching flight results create
flightRouter.post("/flights/live/search", async (req, res) => {
  const requestData = req.body;
  //Getting the date
  const todayMidnight = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  todayMidnight.setHours(0, 0, 0);
  const currentDate = todayMidnight.getTime();
  const userdate = new Date(
    new Date(requestData.date).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  ).getTime();
  //Checking the Date
  if (userdate < currentDate) {
    res.status(400).json({
      error: `Invalid date. Date should be today or the next upcoming day.`,
    });
    return;
  }
  //Travelers
  var totalTravelers =
    requestData.adults + requestData.children + requestData.infants;
  var adults = requestData.adults;
  var children = requestData.children;
  var infants = requestData.infants;

  if (!(totalTravelers >= 1 && totalTravelers <= 9)) {
    res
      .status(400)
      .json({ error: `Invalid Total Travelers ${totalTravelers}` });
    return;
  }

  if (infants > adults || infants > 4 || (adults === 0 && children >= 1)) {
    res.status(400).json({
      error: `Invalid Travelers. For ${adults} adults, only ${adults} infant is allowed.`,
    });
    return;
  }
  //Cabin class
  const cabin_class = req.body.cabin_class;
  if (
    !["Economy", "Premium Economy", "First Class", "Business"].includes(
      cabin_class
    )
  ) {
    res.status(400).json({
      error: `Invalid cabin class ${cabin_class}. Enter 'Economy', 'Premium Economy', 'First Class', 'Business' `,
    });
    return;
  }
  //type:oneway and twoway
  const oneWay = fsReadFileSynchToArray("./src/data/create.json");
  const twoWay = fsReadFileSynchToArray("./src/data/create.json");
  const trip_type = requestData.trip_type;
  if (trip_type === "one-way") {
    const onewayResult = {
      requestData,
      oneway_details: oneWay,
    };
    res.json(onewayResult);
  } else if (trip_type === "two-way") {
    const twowayResult = {
      requestData,
      twoway_details: twoWay,
    };
    res.json(twowayResult);
  } else {
    res.status(400).json({
      error: `Entered invalid ${trip_type}. Please enter two-way or one-way`,
    });
  }
});



//used to read the json file
function fsReadFileSynchToArray(filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

module.exports = flightRouter;

//************************************************************************************************** */
function validateFlightSearchRequest(requestData) {
  const errors = [];

  // Validate market
  if (!requestData.market) {
    errors.push("Missing required field: market");
  } else if (typeof requestData.market !== "string") {
    errors.push("Invalid market format: must be a string");
  }

  // Validate locale
  if (!requestData.locale) {
    errors.push("Missing required field: locale");
  } else if (typeof requestData.locale !== "string") {
    errors.push("Invalid locale format: must be a string");
  }

  // Validate currency
  if (!requestData.currency) {
    errors.push("Missing required field: currency");
  } else if (typeof requestData.currency !== "string") {
    errors.push("Invalid currency format: must be a string");
  }

  // Validate queryLegs
  if (!requestData.queryLegs || !Array.isArray(requestData.queryLegs)) {
    errors.push("Missing or invalid queryLegs: must be an array");
  } else {
    for (const leg of requestData.queryLegs) {
      if (!leg.originPlaceId || !leg.destinationPlaceId || !leg.date) {
        errors.push(
          "Invalid queryLeg object: missing originPlaceId, destinationPlaceId, or date"
        );
      }
    }
  }

  // Validate adults (already a number)
  if (requestData.adults < 1) {
    errors.push("Invalid number of adults: must be at least 1");
  }

  // Validate childrenAges (already an array)
  // No specific validation needed for empty array

  // Validate cabinClass
  if (!requestData.cabinClass) {
    errors.push("Missing required field: cabinClass");
  } else if (typeof requestData.cabinClass !== "string") {
    errors.push("Invalid cabinClass format: must be a string");
  }

  // Validate excludedAgentsIds and excludedCarriersIds (already arrays)
  // No specific validation needed for empty arrays

  // Validate includedAgentsIds and includedCarriersIds (already arrays)
  // No specific validation needed for empty arrays

  if (errors.length > 0) {
    return {
      success: false,
      errors: errors,
    };
  } else {
    // Data is valid, return success response (replace with your actual logic)
    return {
      success: true,
      data: requestData, // Or processed data for the API call
    };
  }
}

// Example usage
const requestData = {
  market: 'UK',
  locale: 'en-GB',
  currency: 'GBP',
  queryLegs: [
    {
      originPlaceId: {}, // Placeholder for actual data
      destinationPlaceId: {}, // Placeholder for actual data
      date: {}, // Placeholder for actual data
    }
  ],
  adults: 2,
  childrenAges: [],
  cabinClass: 'CABIN_CLASS_ECONOMY',
  excludedAgentsIds: [],
  excludedCarriersIds: [],
  includedAgentsIds: [],
  includedCarriersIds: [],
};

const response = validateFlightSearchRequest(requestData);

if (response.success) {
  console.log("Flight search data is valid!");
  // Send the JSON response to the API (replace with your logic)
  // ...
} else {
  console.error("Flight search data is invalid:");
  console.error(response.errors);
}
