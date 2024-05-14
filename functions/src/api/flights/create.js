const express = require("express");
const { db } = require("../../config/admin");
const { fsReadFileToJSON } = require("../../utils/fileReader");
const generateSessionToken = require("../../utils/tokenGenerate");
const validateRequest = require("../../services/flight-search/validate-request");

const createRouter = express.Router();

// FLIGHT CREATE REQUEST API
createRouter.post("/flights/live/search/create", async (req, res) => {
  const { query } = req.body;
  // validating the Market, locale, currency, cabinclass and travellers,all the query
  const validationResults = validateRequest(query);
  if (validationResults.error) {
    return res.status(400).json({
      code: validationResults.code,
      message: validationResults.message,
      details: [],
    });
  }

  //******************Connecting firebase firestore databse***************************************
  const sessionToken = generateSessionToken();
  // console.log('Session Token:', sessionToken);
  try {
    const uniqueId = Date.now().toString();
    // console.log('uniqueId:',uniqueId); //1714476314120
    await db.collection("flight_details").doc(sessionToken).create({
      id: uniqueId,
      token: sessionToken,
      market: query.market,
      locale: query.locale,
      currency: query.currency,
      trip: query.queryLegs.length,
      adults: query.adults,
      childrenAges: query.childrenAges,
    });

    let adults = query.adults;
    const childrenAges = query.childrenAges;
    const totalChild = childrenAges.filter((age) => age > 1).length;
    let totalAdultChild = totalChild + adults; //checking the total adult and child
    if (totalAdultChild >= 9) {
      const jsonData = await fsReadFileToJSON("./src/data/error-create.json");
      return res.status(200).send({
        sessionToken: sessionToken,
        status: "RESULT_STATUS_COMPLETE",
        action: "RESULT_ACTION_REPLACED",
        content: jsonData,
      });
    }
    let tripType = query.queryLegs.length; //checking the request is oneway or twoway
    if (tripType === 1) {
      const jsonData = await fsReadFileToJSON("./src/data/one-way-create.json");
      return res.status(200).send({
        sessionToken: sessionToken,
        status: "RESULT_STATUS_INCOMPLETE 1",
        action: "RESULT_ACTION_REPLACED",
        content: jsonData,
      });
    } else if (tripType === 2) {
      const jsonData = await fsReadFileToJSON("./src/data/two-way-create.json");
      return res.status(200).send({
        sessionToken: sessionToken,
        status: "RESULT_STATUS_INCOMPLETE 2",
        action: "RESULT_ACTION_REPLACED",
        content: jsonData,
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Error",
      msg: "Failed to read data",
    });
  }
});

module.exports = createRouter;
