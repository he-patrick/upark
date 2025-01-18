// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseconfig.js";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("Firebase config reloaded");

export const db = getFirestore();
export const colRef = collection(db, "users");

export const fetchData = async () => {
  let users = [];
  try {
    const snapshot = await getDocs(colRef);
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    console.log("Fetched users:", pins);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addUser = async (name, license) => {
  try {
    const docRef = await addDoc(colRef, {
      name,
      license,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export default app;
