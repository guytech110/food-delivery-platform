// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8L9rV_Rq30xI4tqtxULqi2e7NsC0aqRY",
  authDomain: "hometaste-aaba7.firebaseapp.com",
  projectId: "hometaste-aaba7",
  storageBucket: "hometaste-aaba7.firebasestorage.app",
  messagingSenderId: "268686169752",
  appId: "1:268686169752:web:4a061f38660bb71e7b62ed",
  measurementId: "G-MEKBW0B813"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 