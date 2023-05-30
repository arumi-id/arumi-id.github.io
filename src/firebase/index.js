import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDjuq_ZyNu-pbMbPLa994mJlD1aviZvHsw",
    authDomain: "arumi-id.firebaseapp.com",
    projectId: "arumi-id",
    storageBucket: "arumi-id.appspot.com",
    messagingSenderId: "722517493716",
    appId: "1:722517493716:web:e93db33e4eb2c980b17841",
    measurementId: "G-G4M626TSQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {
    db
}