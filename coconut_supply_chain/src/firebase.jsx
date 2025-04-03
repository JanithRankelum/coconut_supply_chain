// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth"; 

// Firebase config object, you need to replace these values with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDuA_pFwE-dhPWves2LqcNyXP2CCwWnvQU",
  authDomain: "coconut-supply-chain.firebaseapp.com",
  projectId: "coconut-supply-chain",
  storageBucket: "coconut-supply-chain.appspot.com",
  messagingSenderId: "606633234016",
  appId: "1:606633234016:web:70806945ea49486c4afd05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
