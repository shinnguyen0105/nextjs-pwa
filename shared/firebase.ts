import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
