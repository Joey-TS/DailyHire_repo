// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";  //Used everytime to start a new application in firebase
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; //Used for authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "enter API KEY",
  authDomain: "enter Auth domain",
  projectId: "Enter project id",
  storageBucket: "enter storage bucket",
  messagingSenderId: "enter messagesenderid",
  appId: "enter appId",
  measurementId: "enter measuremenrID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
