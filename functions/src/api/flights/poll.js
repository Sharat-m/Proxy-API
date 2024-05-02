const  express = require ("express");
const fs = require ("fs");

const createRouter =  express.Router();

//Fetching flight results poll
createRouter.post("/flights/live/search/poll/:token", async (req, res) => {
return 
});

   


module.exports = createRouter;