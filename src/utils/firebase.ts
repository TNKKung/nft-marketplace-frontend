import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_NFT_MARKETPLACE_APIKEY,
  authDomain: process.env.REACT_APP_NFT_MARKETPLACE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_NFT_MARKETPLACE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_NFT_MARKETPLACE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_NFT_MARKETPLACE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_NFT_MARKETPLACE_APP_ID,
  measurementId: process.env.REACT_APP_NFT_MARKETPLACE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
