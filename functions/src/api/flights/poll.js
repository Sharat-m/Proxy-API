const express = require("express");
const { db } = require("../../config/admin");
const { fsReadFileToJSON } = require("../../utils/fileReader");

const pollRouter = express.Router();

// FLIGHT POLL REQUEST API
pollRouter.post("/flights/live/search/:poll", async (req, res) => {
  const token = req.params.poll;

  try {
    const docRef = db.collection("flight_details").doc(token);
    let flightDetail = await docRef.get();
    // Fetching the data from database
    // let response = flightDetail.data();
    //  console.log(response);
    if (flightDetail.exists) {
      const jsonData = await fsReadFileToJSON("./src/data/poll.json");
      return res.status(200).send({
        sessionToken: token,
        status: "RESULT_STATUS_COMPLETE",
        action: "RESULT_ACTION_REPLACED",
        // msg: response,
        content: jsonData,
      });
    } else {
      return res.status(400).send({
        code: 3,
        message: "No valid token provided",
        details: [],
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Failed",
      msg: error,
    });
  }
});

module.exports = pollRouter;