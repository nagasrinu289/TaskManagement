// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfiBkJLGJueqe1PexMu0Q9JHtL0SBSPJw",
  authDomain: "taskmanagement-f8ca4.firebaseapp.com",
  projectId: "taskmanagement-f8ca4",
  storageBucket: "taskmanagement-f8ca4.appspot.com",
  messagingSenderId: "256994535410",
  appId: "1:256994535410:web:656d8905f732edf5402d6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Pass the app instance to getFirestore

export { db }; // Export the Firestore instance
