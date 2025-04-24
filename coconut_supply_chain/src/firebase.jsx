// firebase.jsx

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

// Firebase configuration
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
const db = getFirestore(app); // ✅ Initialize Firestore
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Register with email and password
const registerWithEmail = async (email, password, businessName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    // Optional: save business name in Firestore here
  } catch (error) {
    throw error;
  }
};

// Login with email and password
const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    throw error;
  }
};

// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google sign-in successful:", result.user);
  } catch (error) {
    throw error;
  }
};

// Reset password
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// ✅ Export auth and db (required for Firestore access)
export {
  db,
  auth,
  googleProvider,
  registerWithEmail,
  loginWithEmail,
  signInWithGoogle,
  resetPassword
};
