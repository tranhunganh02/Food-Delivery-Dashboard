// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  getCountFromServer,
  query,
  collection,
  where,
  getDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { Alert } from "antd";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQtiBswAc9Qn5w_5ePEW_8QJejfDQckqA",
  authDomain: "test1-8afe3.firebaseapp.com",
  databaseURL:
    "https://test1-8afe3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test1-8afe3",
  storageBucket: "test1-8afe3.appspot.com",
  messagingSenderId: "282946755124",
  appId: "1:282946755124:web:c0216d3934eb0c14924861",
  measurementId: "G-PXTTR98PD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);
const dbFireStore = getFirestore(app);
const dbRealTime = getDatabase(app);
async function getStatistical() {
  const collUser = collection(dbFireStore, "users");
  const qUser = query(collUser, where("role", "==", 0));
  const qDeliver = query(collUser, where("role", "==", 2));
  const snapshotUser = await getCountFromServer(qUser);
  const snapshotDeliver = await getCountFromServer(qDeliver);
  const collOrder = collection(dbFireStore, "orders");
  const q = query(collOrder,where("status", "==", 3));
  const snapshotOrder = await getCountFromServer(q);
  const data = {
    quantityUser : snapshotUser.data().count,
    quantityDeliver : snapshotDeliver.data().count,
    quantityOrderSuccess: snapshotOrder.data().count
  }
  return data
}
async function getInformationFood(id) {
  const docRef = doc(dbFireStore, "products", `${id}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    alert("Can not found this food")
  }
}
async function updateFood(id, name, price, category, navigate) {
  const docRef = doc(dbFireStore, "products", `${id}`);

  await updateDoc(docRef, {
    name: name,
    selectedCategory: category,
    price: price
  }).then(
    alert("Succes"),
    navigate(`../list-food`)
  );
 
}
export { dbRealTime, auth, dbFireStore, getStatistical, getInformationFood, updateFood };
