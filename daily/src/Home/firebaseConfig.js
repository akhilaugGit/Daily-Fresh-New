// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk-_dJ4jtsDG__thJ1qo1EqnKrDQBABMw",
  authDomain: "daily-fresh-797bb.firebaseapp.com",
  projectId: "daily-fresh-797bb",
  storageBucket: "daily-fresh-797bb.appspot.com",
  messagingSenderId: "677893077295",
  appId: "1:677893077295:web:beb84b8490b0185ba2c9da",
  measurementId: "G-CJCZ49JMWH"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
