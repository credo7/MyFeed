// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNxcNX4Rx3KlB-vH5MrtzZ-PvnIHCUPZE",
  authDomain: "instagram-clone-8f507.firebaseapp.com",
  projectId: "instagram-clone-8f507",
  storageBucket: "instagram-clone-8f507.appspot.com",
  messagingSenderId: "233258054230",
  appId: "1:233258054230:web:260283d93db088253e81f7",
  measurementId: "G-4EELJQ182W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);