import * as firebase from 'firebase';
//import FirebaseApp from '@firebase/app';

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCHGOg6zhT96i4YiFMqk_kRacXr_VryqqM",
    authDomain: "homodemo-a72ec.firebaseapp.com",
    databaseURL: "https://homodemo-a72ec.firebaseio.com",
    projectId: "homodemo-a72ec",
    storageBucket: "homodemo-a72ec.appspot.com",
    messagingSenderId: "156508141120",
    appId: "1:156508141120:web:f9be3034b96298d48e51a5"
  };
  
//FirebaseApp.initializeApp();
firebase.initializeApp(firebaseConfig);

export const rootRef = firebase.database().ref();
export const walletRef = rootRef.child('Wallet');
export const categoryRef = rootRef.child('Category');
//export const subcategoryRef = rootRef.child('SubCategory');