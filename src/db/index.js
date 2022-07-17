import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBcSLXjbC1dbemi6e8wNJk_UdvipsUf1WI",
  authDomain: "docs-de514.firebaseapp.com",
  projectId: "docs-de514",
  storageBucket: "docs-de514.appspot.com",
  messagingSenderId: "411206376561",
  appId: "1:411206376561:web:3a39743a47ef5671ebcfd0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;

