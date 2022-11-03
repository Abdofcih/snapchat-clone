// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8cTCUJijMgy1zd_2qjnWDcnhhqTZLBog",
  authDomain: "snapchatt-t.firebaseapp.com",
  projectId: "snapchatt-t",
  storageBucket: "snapchatt-t.appspot.com",
  messagingSenderId: "163076112933",
  appId: "1:163076112933:web:2f7a3bdd4ac77b0cddb5cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
