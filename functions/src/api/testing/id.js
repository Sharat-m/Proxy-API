const express = require("express");
const { db } = require("../../config/admin");

const idRouter = express.Router();

//Fetch single data from the specific ID
idRouter.get("/get/:id", async (req, res) => {
  try {
    const docRef = db.collection("userDetails").doc(req.params.id);
    let userDetail = await docRef.get();
    let response = userDetail.data();
    if (userDetail.exists) {
      //   console.log(response);
      return res.status(200).send({
        status: "Succes",
        msg: response,
      });
    } else {
      return res.status(400).send({
        status: "Failed",
        msg: "No document found",
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

module.exports = idRouter;
