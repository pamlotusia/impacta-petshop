// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALV3U-w7Ds8tMrzrZZZz9XJ50hYI6XAUM",
  authDomain: "petshop-impacta-ae693.firebaseapp.com",
  databaseURL: "https://petshop-impacta-ae693-default-rtdb.firebaseio.com",
  projectId: "petshop-impacta-ae693",
  storageBucket: "petshop-impacta-ae693.appspot.com",
  messagingSenderId: "186447942464",
  appId: "1:186447942464:web:c54645ad0f1c4f0ddb60a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)