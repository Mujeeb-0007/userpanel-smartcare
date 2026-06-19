import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgnTyOENzxG4iIsOHLu5LdK6jqexPApMo",
  authDomain: "smart-care-6731e.firebaseapp.com",
  projectId: "smart-care-6731e",
  storageBucket: "smart-care-6731e.firebasestorage.app",
  messagingSenderId: "735435651040",
  appId: "1:735435651040:web:267da8bb593bb0b49e1d85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;