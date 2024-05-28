const express = require("express");
const ipData = require("../../data/ipresult.json");

const ipResultRouter = express.Router();

function validateIp(ipAddress) {
  // Regex expression for validating IPv4
  let ipv4 =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])$/;
  // Regex expression for validating IPv6
  let ipv6 = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/;

  if (!ipAddress) {
    return { error: true, code: 3, message: "The ip address is missing" };
  }

  if (!ipAddress.match(ipv4) && !ipAddress.match(ipv6)) {
    return { error: true, code: 3, message: "The ip address is invalid" };
  }
  return { error: false };
}

ipResultRouter.get("/culture/nearestculture", async (req, res) => {
  let ipAddress = req.query.ipAddress;

  let valiadationIp = validateIp(ipAddress);
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
