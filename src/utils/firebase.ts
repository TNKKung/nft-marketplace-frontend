import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCSOy_vCqXa_2isRLyzJpPwpI0Gn-jw2O4",
  authDomain: "nft-marketplace-frontend.firebaseapp.com",
  projectId: "nft-marketplace-frontend",
  storageBucket: "nft-marketplace-frontend.appspot.com",
  messagingSenderId: "1082818985782",
  appId: "1:1082818985782:web:3f80d8f7813c258122fd97",
  measurementId: "G-RLPP45HZ7W",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
