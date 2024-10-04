import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID //this is not necessary
// };

const firebaseConfig = {
  apiKey: "AIzaSyDtNe55mVDlpN4E5145N9k_b2Pb12kVJuA",
  authDomain: "store-blog-ba1bd.firebaseapp.com",
  projectId: "store-blog-ba1bd",
  storageBucket: "store-blog-ba1bd.appspot.com",
  messagingSenderId: "207101538446",
  appId: "1:207101538446:web:f095d67b35179fd79c99df",
  measurementId: "G-S9N79EYC6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);