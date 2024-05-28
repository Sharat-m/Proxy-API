const express = require("express");
const localesData = require("../../data/locales.json"); 

const localesRouter = express.Router();



localesRouter.get("/locales", (req, res) => {
  // let url = req.url;
  // console.log(url);
  // if (url == "locales"){
  //   console.log("enternred");
  // return  res.status(400).json({
  //     code: 5,
  //     message: "Not Found",
  //     details:[],
  //   })
  // }


  try {
    res.status(200).send(localesData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = localesRouter;
