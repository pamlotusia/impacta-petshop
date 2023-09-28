import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'


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
const auth = getAuth(app);

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase listener to track authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(response.user);
    } catch (error) {
      return error.message;
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      setUser(response.user);
    } catch (error) {
      return error.message;
    }
  };

  const signout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};