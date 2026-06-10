import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfzOwFTDT2JELQwKZ-FqLZTUYipU06Zck",
  authDomain: "vibeflow-f5cfc.firebaseapp.com",
  projectId: "vibeflow-f5cfc",
  storageBucket: "vibeflow-f5cfc.firebasestorage.app",
  messagingSenderId: "211660575500",
  appId: "1:211660575500:web:d058abb8cd7bcc339e2f29",
  measurementId: "G-3GC6FG65ZM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log("Testing read...");
    const snap = await getDocs(collection(db, "playlists"));
    console.log("Read success. Docs count:", snap.docs.length);

    console.log("Testing write...");
    await addDoc(collection(db, "playlists"), { test: true });
    console.log("Write success.");
  } catch (err) {
    console.error("Firebase error:", err.message);
  }
}

test();
