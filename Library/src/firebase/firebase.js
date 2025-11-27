// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP6aQd_329Nf6IxcjXNqUjMt-AivGgW50",
  authDomain: "library-7f8b7.firebaseapp.com",
  projectId: "library-7f8b7",
  storageBucket: "library-7f8b7.firebasestorage.app",
  messagingSenderId: "531158228364",
  appId: "1:531158228364:web:e6e69428d5a82926688aa9",
  measurementId: "G-Z38XQLXH4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)



export { app, auth };