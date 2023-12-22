// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz1UGitTjgrrYMsPZ9dIwPoVpwEaFyiG0",
  authDomain: "twitter-789e7.firebaseapp.com",
  projectId: "twitter-789e7",
  storageBucket: "twitter-789e7.appspot.com",
  messagingSenderId: "698205199055",
  appId: "1:698205199055:web:d2a7bafb8d6d5d032275ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth referansını alma
export const auth = getAuth(app);

// google sağlayıcısı oluşturma
export const provider = new GoogleAuthProvider();

// veri tabanının referansını alma
export const db = getFirestore(app);

// medya depolama alanının referansını alma
export const storage = getStorage(app);
