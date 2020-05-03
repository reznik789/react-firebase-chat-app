import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
