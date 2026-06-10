import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqSNRtWVxUSIRSuMtpQ2zzBK55lMJVjG8",
  authDomain: "vibeflow-d7954.firebaseapp.com",
  projectId: "vibeflow-d7954",
  storageBucket: "vibeflow-d7954.firebasestorage.app",
  messagingSenderId: "264761269252",
  appId: "1:264761269252:web:cc5f92bfd5b72c4623a951",
  measurementId: "G-YZRR4WH9XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
