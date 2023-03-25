// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEeiaWEyKhgkTuuOOa5SVCID23PJeppUo",
  authDomain: "jobhireapp.firebaseapp.com",
  databaseURL:
    "https://jobhireapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jobhireapp",
  storageBucket: "jobhireapp.appspot.com",
  messagingSenderId: "871555939455",
  appId: "1:871555939455:web:35cb3e9ae95b3b845c934a",
  measurementId: "G-0609C1D68C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
