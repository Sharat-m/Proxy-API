const express = require("express");
const fs = require("fs");

const createRouter = express.Router();

//Fetching flight results create
createRouter.post("/flights/live/search", async (req, res) => {
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

createRouter.post("/flights/live/search/create", async (req, res) => {
  const { query } = req.body;

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
    !query.queryLegs[0].date.day
  ) {
    return res
      .status(400)
      .send({ status: "Failed", message: "Invalid request data" });
  }

  // If validation passes, 
  const resultJson = fsReadFileSynchToArray("./src/data/create.json");
      const finalResult = {
        oneway_details: resultJson,
      };
      res.json(finalResult);
  });

//used to read the json file
function fsReadFileSynchToArray(filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

module.exports = createRouter;
