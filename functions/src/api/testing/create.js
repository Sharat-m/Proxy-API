const express = require("express");
const { db } = require('../../config/admin')

const postRouter = express.Router();

//POST
postRouter.post("/create", async (req, res) => {
    try {
      const uniqueId = Date.now().toString();
      // console.log('uniqueId:',uniqueId); //1714476314120
      await db.collection("userDetails").doc(uniqueId).create({
        id: uniqueId,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });
      return res.status(200).send({
        status: "Success",
        msg: "Data saved",
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  });


module.exports = postRouter;



