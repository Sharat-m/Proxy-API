const express = require("express");

const { db } = require("../../config/admin");

const updateRouter = express.Router();

//UPDATE
updateRouter.put("/update/:id", async (req, res) => {
  try {
    const reqDoc = db.collection("userDetails").doc(req.params.id);
    // console.log("reqDoc: ",reqDoc);
    await reqDoc.update({
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address,
    });
    return res.status(200).send({
      status: "Success",
      msg: "Data updated",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Failed",
      msg: error,
    });
  }
});

module.exports = updateRouter;
