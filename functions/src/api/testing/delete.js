const express = require("express");
const { db } = require("../../config/admin");

const deleteRouter = express.Router();
//Delete
deleteRouter.delete("/delete/:id", async (req, res) => {
  try {
    const reqDoc = db.collection("userDetails").doc(req.params.id);
    // console.log("reqDoc: ",reqDoc);
    await reqDoc.delete();
    return res.status(200).send({
      status: "Success",
      msg: "Data Removed",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Failed",
      msg: error,
    });
  }
});

module.exports = deleteRouter;
