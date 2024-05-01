const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var fs = require("fs");
const geoData = require("./src/data/geo-data.json");

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

//############################################################ Testing APIs ######################################################################################
//Testing Routes
//GET
app.get("/", (req, res) => {
  return res.status(200).send("Hello From firebase Function !");
});

//POST
app.post("/api/create", async (req, res) => {
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

//Fetch single data from the specific ID
app.get("/api/get/:id", async (req, res) => {
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

//Fetch all the details from the firestore database 
app.get("/api/getAll", async (req, res) => {
  try {
    const query = db.collection("userDetails");
    // console.log('query:',query);
    let response = [];
    await query.get().then((data) => {
      let docs = data.docs;
      //console.log('docs:',docs);
      docs.map((doc) => {
        const selectedItem = {
          name: doc.data().name,
          mobile: doc.data().mobile,
          address: doc.data().address,
        };
        response.push(selectedItem);
      });
      return response;
    });
    return res.status(200).send({
      status: "Succes",
      msg: response,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Failed",
      msg: error,
    });
  }
});

//UPDATE
app.put("/api/update/:id", async (req, res) => {
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

//DELETE
app.delete("/api/delete/:id", async (req, res) => {
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







//############################################################ Skyscanner Replica APIs ######################################################################################
// Skyscanner replica routes
app.get("/flights", (req, res) => {
  return res.status(200).send("Flights Details are showned !");
});

//Geo Api
app.get("/geo/hierarchy/flights/locale", (req, res) => {
  try {
    return res.status(200).send(geoData);
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: "Failed",
      msg: error,
    });
  }
});

//Fetching flight results
app.post("/flight-results", async (req, res) => {
  const requestData = req.body;
  const todayMidnight = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  todayMidnight.setHours(0, 0, 0);
  const currentDate = todayMidnight.getTime();
  const userdate = new Date(
    new Date(requestData.date).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  ).getTime();
  //date
  if (userdate < currentDate) {
    res.status(400).json({
      error: `Invalid date. Date should be today or the next upcoming day.`,
    });
    return;
  }
  //Travelers
  var totalTravelers =
    requestData.adults + requestData.children + requestData.infants;
  var adults = requestData.adults;
  var children = requestData.children;
  var infants = requestData.infants;

  if (!(totalTravelers >= 1 && totalTravelers <= 9)) {
    res
      .status(400)
      .json({ error: `Invalid Total Travelers ${totalTravelers}` });
    return;
  }

  if (infants > adults || infants > 4 || (adults === 0 && children >= 1)) {
    res.status(400).json({
      error: `Invalid Travelers. For ${adults} adults, only ${adults} infant is allowed.`,
    });
    return;
  }
  //cabin class
  const cabin_class = req.body.cabin_class;
  if (
    !["Economy", "Premium Economy", "First Class", "Business"].includes(
      cabin_class
    )
  ) {
    res.status(400).json({
      error: `Invalid cabin class ${cabin_class}. Enter 'Economy', 'Premium Economy', 'First Class', 'Business' `,
    });
    return;
  }
  //type:oneway and twoway
  const oneWay = fsReadFileSynchToArray("./onewaydetails.json");
  const twoWay = fsReadFileSynchToArray("./twowaydetails.json");
  const trip_type = requestData.trip_type;
  if (trip_type === "one-way") {
    const onewayResult = {
      requestData,
      oneway_details: oneWay,
    };
    res.json(onewayResult);
  } else if (trip_type === "two-way") {
    const twowayResult = {
      requestData,
      twoway_details: twoWay,
    };
    res.json(twowayResult);
  } else {
    res.status(400).json({
      error: `Entered invalid ${trip_type}. Please enter two-way or one-way`,
    });
  }
});

//Create search
app.post("/flights/live/search/create", async (req, res) => {
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
