const admin = require("firebase-admin");

//Service account key getting adding from the firebase project to use the project
var serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Main firestore Database
const db = admin.firestore();

module.exports = { admin, db };
