const express = require('express');
const axios = require('axios'); //to make HTTP request


const ipRouter = express.Router();

ipRouter.get('/get-ip', async (req, res) => {
    try {
        const response = await axios.get('https://api.ipify.org/?format=json');
        // console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json( { error : "Failed to Fetch IP" });
    }
})


module.exports = ipRouter;