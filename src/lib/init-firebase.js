// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDEaM16yJX0BPNN_XqedfFRTIQ2i4Lmfxc",
  authDomain: "fir-api-7421d.firebaseapp.com",
  projectId: "fir-api-7421d",
  storageBucket: "fir-api-7421d.appspot.com",
  messagingSenderId: "857052161615",
  appId: "1:857052161615:web:00931567f820bd62d6ec3a",
  measurementId: "G-5Q70705WD3"
  // apiKey: "AIzaSyB4FvwEVS8EZxrxvkNxL58itASSjtJxu9k",
  // authDomain: "apt-rite-346310.firebaseapp.com",
  // databaseURL: "https://apt-rite-346310-default-rtdb.firebaseio.com",
  // projectId: "apt-rite-346310",
  // storageBucket: "apt-rite-346310.appspot.com",
  // messagingSenderId: "780318268681",
  // appId: "1:780318268681:web:4aa488caf655a7839487d8",
  // measurementId: "G-MBDL1YQ10P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
// Initialize Firestore
export const db = getFirestore(app)

export const auth= getAuth(app)