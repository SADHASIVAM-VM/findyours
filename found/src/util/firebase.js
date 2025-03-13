import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCH0aW-HQ4HZKLNk9cNf8NbUGy7OTbnyzE",
  authDomain: "findit-c578f.firebaseapp.com",
  projectId: "findit-c578f",
  storageBucket: "findit-c578f.firebasestorage.app",
  messagingSenderId: "394194449273",
  appId: "1:394194449273:web:7ce9a0c4757f140097f5a8",
  measurementId: "G-HHYFC9GHZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

