import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBEcWGkaOUyk-tTvJjzyoNMKl1erb5A_JQ',
  authDomain: 'myfeed-b79aa.firebaseapp.com',
  projectId: 'myfeed-b79aa',
  storageBucket: 'myfeed-b79aa.appspot.com',
  messagingSenderId: '1095789745350',
  appId: '1:1095789745350:web:de5c9f90e6a8fc612033c7'
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export const auth = getAuth(app);

export { app, db, storage };

export default app;
