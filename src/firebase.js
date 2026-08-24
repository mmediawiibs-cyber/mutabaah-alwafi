import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// GANTI kode di dalam firebaseConfig ini dengan
// kode milik Anda yang disalin dari Firebase Console (Langkah 2.1)
const firebaseConfig = {
  apiKey: "AIzaSyDYyqZjTmVNKdlHHn8oxyO33Z-ZzdHoIEg",
  authDomain: "mutabaah-santri-f0ece.firebaseapp.com",
  projectId: "mutabaah-santri-f0ece",
  storageBucket: "mutabaah-santri-f0ece.firebasestorage.app",
  messagingSenderId: "181839348367",
  appId: "1:181839348367:web:0793e2cffdc1d52721a6fa",
};

// Inisialisasi Firebase & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
