// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnQFjWNADYqqvNENxterTH59K7Xd5jqIA",
  authDomain: "react-2023-77d4e.firebaseapp.com",
  projectId: "react-2023-77d4e",
  storageBucket: "react-2023-77d4e.appspot.com",
  messagingSenderId: "301239795820",
  appId: "1:301239795820:web:1c45aaa409bcd177155849",
  measurementId: "G-T71PGYZ0YN"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getFirestore(firebaseApp)