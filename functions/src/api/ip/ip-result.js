const express = require("express");
const axios = require("axios");
const ipData = require("../../data/ipresult.json");

const ipResultRouter = express.Router();

function validateIp(ipAddress, status) {
  if (!ipAddress) {
    return { error: true, code: 3, message: "The ip address is missing" };
  }
  if (status == "fail") {
    return { error: true, code: 3, message: "The ip address is invalid" };
  }

  return { error: false };
}

ipResultRouter.get("/culture/nearestculture", async (req, res) => {
  let ipAddress = req.query.ipAddress;

  const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
  let status = response.data.status;

  let valiadationIp = validateIp(ipAddress, status);
  if (valiadationIp.error) {
    return res.status(400).json({
      code: valiadationIp.code,
      message: valiadationIp.message,
      details: [],
    });
  }

  try {
    res.status(200).send(ipData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = ipResultRouter;
