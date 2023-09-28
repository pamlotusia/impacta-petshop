import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyALV3U-w7Ds8tMrzrZZZz9XJ50hYI6XAUM",
  authDomain: "petshop-impacta-ae693.firebaseapp.com",
  databaseURL: "https://petshop-impacta-ae693-default-rtdb.firebaseio.com",
  projectId: "petshop-impacta-ae693",
  storageBucket: "petshop-impacta-ae693.appspot.com",
  messagingSenderId: "186447942464",
  appId: "1:186447942464:web:c54645ad0f1c4f0ddb60a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app