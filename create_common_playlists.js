import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const commonPlaylists = [
];

async function seedPlaylists() {
  try {
    console.log("Seeding common playlists...");
    for (const playlist of commonPlaylists) {
      await addDoc(collection(db, "playlists"), playlist);
      console.log(`Added playlist: ${playlist.name}`);
    }
    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Error adding playlists:", err);
    process.exit(1);
  }
}

seedPlaylists();
