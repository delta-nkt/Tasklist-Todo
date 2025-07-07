import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLSCbLk1Py2iu-yxBDZKW5wDuCeZbyDdU",
  authDomain: "tasklist-27603.firebaseapp.com",
  databaseURL: "https://tasklist-27603-default-rtdb.firebaseio.com",
  projectId: "tasklist-27603",
  storageBucket: "tasklist-27603.firebasestorage.app",
  messagingSenderId: "545361056537",
  appId: "1:545361056537:web:2234483ad3a079363c6b88"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}; 