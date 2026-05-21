import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB4JPBOFz6mpZXgExQ_Sw4jku6RNlau9Nc",
  authDomain: "recovery-6720d.firebaseapp.com",
  databaseURL: "https://recovery-6720d-default-rtdb.firebaseio.com",
  projectId: "recovery-6720d",
  storageBucket: "recovery-6720d.firebasestorage.app",
  messagingSenderId: "488755256889",
  appId: "1:488755256889:web:041b60e868b34477d777e8"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const DB_KEY = "amma-diet-v1";
