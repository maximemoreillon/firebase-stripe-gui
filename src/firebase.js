import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDWwYXojYXGEg6-3aU_ajymTMJyLgb3W5A",
  authDomain: "fir-stripe-extension.firebaseapp.com",
  projectId: "fir-stripe-extension",
  storageBucket: "fir-stripe-extension.appspot.com",
  messagingSenderId: "819655286610",
  appId: "1:819655286610:web:05ed5fab161c8e189e248b",
  measurementId: "G-QL6GCRYWZX",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const firestore = getFirestore()

export { app, firestore, analytics }
