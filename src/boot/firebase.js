import { firebaseConfig } from "../../credentials/firebase-config.js";

var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseDb = firebaseApp.database();

export { firebaseDb };
