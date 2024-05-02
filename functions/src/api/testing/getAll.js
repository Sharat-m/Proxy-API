
const express = require ("express");
const  { db } = require ("../../config/admin")

const getAllRouter = express.Router();

//Fetch all the details from the firestore database 
getAllRouter.get("/getAll", async (req, res) => {
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
  

module.exports = getAllRouter;