const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");


//Main App
const app = express();
app.use(cors({ origin: true })); //This will allow cors sharing for the APIs
app.use(bodyParser.json());

//Firebase service code
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Main firestore Database
const db = admin.firestore();


//Working on create API
//   app.post("/flights/live/search/create", async (req, res) => {
//     try {
//       const uniqueId = Date.now().toString();
//       // console.log('uniqueId:',uniqueId); //1714476314120
//       await db.collection("userDetails").doc(uniqueId).create({
//             "query": {
//                 market: req.body.market,  //IN
//                 locale: req.body.locale, //en-GB
//                 currency: req.body.currency, //INR,
//                 "queryLegs": [
//                     {
//                         "originPlaceId": {
//                             iata: req.body.iata //IXE
//                         },
//                         "destinationPlaceId": {
//                             iata: req.body.iata //BLR
//                         },
//                         "date": {
//                             "year": 2024,
//                             "month": 5,
//                             "day": 28
//                         }
//                     }
//                 ],
//                 "cabinClass": "CABIN_CLASS_ECONOMY",
//                 "adults": 1,
//                 "childrenAges": []
//             }
//       });
//       return res.status(200).send({
//         status: "Success",
//         msg: "Data saved",
//       });
//     } catch (error) {
//       // console.log(error);
//       return res.status(500).send({
//         status: "Failed",
//         msg: error,
//       });
//     }
//   });

function fsReadFileSynchToArray(filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

//Exports the API to firebase cloud functions
exports.app = onRequest(app);

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
