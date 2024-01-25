// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxCvmjB-dfE4vkLG1SAZBHUDyh0l_2uq0",
  authDomain: "crud-with-coffee-expresso.firebaseapp.com",
  projectId: "crud-with-coffee-expresso",
  storageBucket: "crud-with-coffee-expresso.appspot.com",
  messagingSenderId: "376376582837",
  appId: "1:376376582837:web:785cafb36f41913c7954fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;