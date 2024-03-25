// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";  //Used everytime to start a new application in firebase
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; //Used for authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmrcRMp16XxuLvz_ju0cR9Yn1j8qvE4mI",
  authDomain: "dailyhire-806d2.firebaseapp.com",
  projectId: "dailyhire-806d2",
  storageBucket: "dailyhire-806d2.appspot.com",
  messagingSenderId: "646253018494",
  appId: "1:646253018494:web:8e56924c7c7ba69aafc72f",
  measurementId: "G-5SXKG7B086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);