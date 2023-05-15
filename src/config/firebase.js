// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQtiBswAc9Qn5w_5ePEW_8QJejfDQckqA",
  authDomain: "test1-8afe3.firebaseapp.com",
  databaseURL: "https://test1-8afe3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test1-8afe3",
  storageBucket: "test1-8afe3.appspot.com",
  messagingSenderId: "282946755124",
  appId: "1:282946755124:web:c0216d3934eb0c14924861",
  measurementId: "G-PXTTR98PD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);
const dbFireStore = getFirestore(app);
const dbRealTime = getDatabase(app);

export {dbRealTime, auth, dbFireStore}