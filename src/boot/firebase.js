import { firebaseConfig } from "../../credentials/firebase-config.js";

var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");
require("firebase/storage");
require("firebase/auth");

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseDb = firebaseApp.database();
let firebaseStorage = firebaseApp.storage();
let firebaseAuth = firebaseApp.auth();

export { firebaseDb, firebaseStorage, firebaseAuth };
