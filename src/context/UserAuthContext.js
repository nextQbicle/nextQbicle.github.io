import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig"; // Add Firestore reference

const userAuthContext = createContext();

export const useAuth = () => useContext(userAuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUserData(uid) {
    try {
      const userDoc = await getDoc(doc(db, "Users", uid));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.error("No such user document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await fetchUserData(currentUser.uid);
        setUser({ ...currentUser, ...userData });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <userAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </userAuthContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(userAuthContext);
}
