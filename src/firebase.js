import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; //Imports a Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDhWKWIVD_34v6eCMpMkzhStU2CBaFwGsU",
  authDomain: "carbontracker-a7246.firebaseapp.com",
  projectId: "carbontracker-a7246",
  storageBucket: "carbontracker-a7246.firebasestorage.app",
  messagingSenderId: "1030215574951",
  appId: "1:1030215574951:web:b41982ea799529bad14282",
  measurementId: "G-T9213PDWC9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app); //Exports Realtime Database instance
