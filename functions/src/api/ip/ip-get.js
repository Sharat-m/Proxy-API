const express = require('express');
const axios = require('axios'); //to make HTTP request

const ipRouter = express.Router();

ipRouter.get("/get-ip", async (req, res) => {
    try {
        let response = await axios.get(`http://api.ipify.org/`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json( { error : "Failed to Fetch IP" });
    }
})

module.exports = ipRouter;