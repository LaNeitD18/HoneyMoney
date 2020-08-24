import registerRootComponent from "expo/build/launch/registerRootComponent";

import App from "./App";

import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHGOg6zhT96i4YiFMqk_kRacXr_VryqqM",
  authDomain: "homodemo-a72ec.firebaseapp.com",
  databaseURL: "https://homodemo-a72ec.firebaseio.com",
  projectId: "homodemo-a72ec",
  storageBucket: "homodemo-a72ec.appspot.com",
  messagingSenderId: "156508141120",
  appId: "1:156508141120:web:f9be3034b96298d48e51a5",
};

firebase.initializeApp(firebaseConfig);

registerRootComponent(App);
