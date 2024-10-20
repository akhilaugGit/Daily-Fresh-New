// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import Auth and GoogleAuthProvider

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth and provider for use in your components
export { auth, provider };
