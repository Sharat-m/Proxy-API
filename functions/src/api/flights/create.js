const express = require("express");
const fs = require("fs");

const createRouter = express.Router();

createRouter.post("/flights/live/search/create", async (req, res) => {
  const { query } = req.body;
  // console.log(query);
  // console.log("queryLegs:",query.queryLegs);
  // console.log("queryLegs-length:",query.queryLegs.length);
  // console.log("originPlaceId:",query.queryLegs[0].originPlaceId);
  // console.log("destinationPlaceId:",query.queryLegs[0].destinationPlaceId);
  // console.log("date:",query.queryLegs[0].date);
  // const departureDate =  query.queryLegs[0].date;
  // console.log("departureDate: ",departureDate);                     //departureDate:  { year: 2024, month: 5, day: 5 }
  // console.log("year:",query.queryLegs[0].date.year);
  // console.log("month:",query.queryLegs[0].date.month);
  // console.log("day:",query.queryLegs[0].date.day);
  // console.log("adults:" , query.adults);
  // console.log("childrensAge:", query.childrenAges);

  //############ MARKET ####################
  const market = query.market;
  if (!market) {
    return res.status(400).json({
      code: 3,
      message: "The market is missing",
      details: [],
    });
  }

  //############ LOCALE ####################
  const locale = query.locale;
  if (!locale) {
    return res.status(400).json({
      code: 3,
      message: "The locale is missing",
      details: [],
    });
  }

  //############ CURRENCY ####################
  const currency = query.currency;
  if (!currency) {
    return res.status(400).json({
      code: 3,
      message: "The currency is missing",
      details: [],
    });
  }

  //############ DATE VALIDATION ####################
  const departureDate = query.queryLegs[0].date
    ? new Date(
        `${query.queryLegs[0].date.year}-${query.queryLegs[0].date.month}-${query.queryLegs[0].date.day}`
      )
    : null;
  const returnDate = query.queryLegs[1].date
    ? new Date(
        `${query.queryLegs[1].date.year}-${query.queryLegs[1].date.month}-${query.queryLegs[1].date.day}`
      )
    : null;
  //   console.log("Date :", query && query.queryLegs && query.queryLegs[0] && query.queryLegs[0].date);
  //   console.log("New Date :", new Date( `${query.queryLegs[0].date.year}-${query.queryLegs[0].date.month}-${query.queryLegs[0].date.day}` ));
  // console.log("departureDate :", departureDate);
  // console.log("returnDate :", returnDate);

  if (!departureDate || !returnDate) {
    return res
      .status(400)
      .json({ status: "Failed", message: "Missing or invalid date" });
  }
  const todayMidnight = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  todayMidnight.setHours(0, 0, 0);
  const currentDate = todayMidnight.getTime();
  const userDepartureDate = new Date(
    new Date(departureDate).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  ).getTime();
  const userReturnDate = new Date(
    new Date(returnDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  ).getTime();
  //Checking the Date
  if (userDepartureDate < currentDate || userReturnDate < currentDate) {
    // console.log("userDepartureDate :", userDepartureDate);
    // console.log("currentDate :", currentDate);
    res.status(400).json({
      code: 3,
      message: "The date cannot be historical",
      details: [],
    });
    return;
  }

  //################### CABIN CLASS #################
  const cabinClass = query.cabinClass;
  if (
    ![
      "CABIN_CLASS_ECONOMY",
      "CABIN_CLASS_PREMIUM_ECONOMY",
      "CABIN_CLASS_FIRST_CLASS",
      "CABIN_CLASS_BUSINESS",
    ].includes(cabinClass)
  ) {
    res.status(400).json({
      code: 3,
      message: "The cabin class is invalid",
      details: [],
    });
    return;
  }

  //####################### TRAVELLERS ###################################

  var adults = query.adults;
  console.log("adults:",adults);
  var childrens = query.childrenAges;
  var childrenAges = query.childrenAges;
  console.log("childrenAges:",childrenAges);
  let totalChildren = childrenAges.length;
  console.log("totalChildren:", totalChildren);
  var totalTravelers = adults + totalChildren;
  // console.log("totalTravelers :", totalTravelers);

  //The Total children should be [9]
  if (!(totalChildren <= 8)) {
    res.status(400).json({
      code: 3,
      message: "The maximum number of children is 8",
      details: [],
    });
    return;
  }

  //checking the adults==infants
  if (!(adults >= totalChildren)) {
    res.status(400).json({
      code: 13,
      message: "No successful responses were found for the request",
      details: [],
    });
    return;
  }

  if (!(adults >= 1 && adults <= 8)) {
    res.status(400).json({
      code: 3,
      message: "The number of adults must be between 1 and 8",
      details: [],
    });
    return;
  }

  //   if (childrens > adults || childrens > 4 || (adults === 0 && childrens >= 1)) {
  //     res.status(400).json({
  //         "code": 13,
  //         "message": "No successful responses were found for the request.",
  //         "details": []
  //     });
  //     return;
  //   }

  if (
    !query ||
    !query.market ||
    !query.locale ||
    !query.currency ||
    !query.queryLegs ||
    query.queryLegs.length === 0 ||
    !query.adults ||
    !query.queryLegs[0].originPlaceId ||
    !query.queryLegs[0].destinationPlaceId ||
    !query.queryLegs[0].date ||
    !query.queryLegs[0].date.year ||
    !query.queryLegs[0].date.month ||
    !query.queryLegs[0].date.day ||
    !query.adults ||
    !query.childrenAges
  ) {
    return res
      .status(400)
      .json({ status: "Failed", message: "Invalid request data" });
  }
  try {
    // const resultJson = await readDataFromFile("./src/data/create.json");
    res.status(200).send({
      status: "Succes !",
      msg: "You will get the flight result in a while",
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Failed to read data" });
  }
});

//used to read the json file
function fsReadFileSynchToArray(filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

module.exports = createRouter;
