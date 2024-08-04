// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5RYgbFBxY1pXviar0gkA6F-S4kizkMRM",
  authDomain: "tripgenie-716cd.firebaseapp.com",
  projectId: "tripgenie-716cd",
  storageBucket: "tripgenie-716cd.appspot.com",
  messagingSenderId: "1078985339909",
  appId: "1:1078985339909:web:4f962b44a4525fd9e4986c",
  measurementId: "G-7VPFL9730V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);