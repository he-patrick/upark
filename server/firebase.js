// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseconfig.js";
import { getFirestore, collection, getDocs, addDoc, query, updateDoc, doc, where } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("Firebase config reloaded");

export const db = getFirestore();
export const colRef = collection(db, "users");

export const fetchUserData = async () => {
  let users = [];
  try {
    const snapshot = await getDocs(colRef);
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addUser = async (appleID, email, name, license) => {
  try {
    const docRef = await addDoc(colRef, {
      appleID,
      email,
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

export const updateUserInfo = async (appleID, name, license) => {
  try {
    // First, find the document with matching appleID
    const q = query(colRef, where("appleID", "==", appleID));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error("No user found with this Apple ID");
    }

    // Get the first matching document
    const userDoc = querySnapshot.docs[0];
    
    // Update the document
    await updateDoc(doc(db, "users", userDoc.id), {
      name,
      license
    });

    console.log("Document updated successfully");
    return userDoc.id;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default app;
