import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHbPPPmLnbk6aV_mfO-OwCb-ZOHaQvh0M",
  authDomain: "instagram-clone-6ebc5.firebaseapp.com",
  projectId: "instagram-clone-6ebc5",
  storageBucket: "instagram-clone-6ebc5.appspot.com",
  messagingSenderId: "182476848504",
  appId: "1:182476848504:web:93a471fe5ad15392fd9c8d",
  storageBucket: "instagram-clone-6ebc5.appspot.com"
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();