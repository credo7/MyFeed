// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBEcWGkaOUyk-tTvJjzyoNMKl1erb5A_JQ',
  authDomain: 'myfeed-b79aa.firebaseapp.com',
  projectId: 'myfeed-b79aa',
  storageBucket: 'myfeed-b79aa.appspot.com',
  messagingSenderId: '1095789745350',
  appId: '1:1095789745350:web:de5c9f90e6a8fc612033c7',
  // apiKey: 'AIzaSyDNxcNX4Rx3KlB-vH5MrtzZ-PvnIHCUPZE',
  // authDomain: 'instagram-clone-8f507.firebaseapp.com',
  // projectId: 'instagram-clone-8f507',
  // storageBucket: 'instagram-clone-8f507.appspot.com',
  // messagingSenderId: '233258054230',
  // appId: '1:233258054230:web:260283d93db088253e81f7',
  // measurementId: 'G-4EELJQ182W',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export const auth = getAuth(app);

export { app, db, storage };

export default app;
