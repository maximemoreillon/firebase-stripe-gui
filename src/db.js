import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Load config from environment
const {
    VUE_APP_FIREBASE_API_KEY,
    VUE_APP_FIREBASE_AUTH_DOMAIN,
    VUE_APP_FIREBASE_DATABASE_URL,
    VUE_APP_FIREBASE_PROJECT_ID,
    VUE_APP_FIREBASE_STORAGE_BUCKET,
    VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    VUE_APP_FIREBASE_APP_ID,
    VUE_APP_FIREBASE_MEASUREMENT_ID,
} = process.env


// Inject firebase config
const firebaseConfig = {
    apiKey: VUE_APP_FIREBASE_API_KEY,
    authDomain: VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: VUE_APP_FIREBASE_DATABASE_URL,
    projectId: VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: VUE_APP_FIREBASE_APP_ID,
    measurementId: VUE_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore()

export {app, firestore}
