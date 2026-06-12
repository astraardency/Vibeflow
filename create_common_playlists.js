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
  {
    name: "Vibeflow Top 50 Tamil",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  },
  {
    name: "Lofi Study Beats",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  },
  {
    name: "Workout Mix",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  }
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
