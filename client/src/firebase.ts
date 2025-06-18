import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8D71zpRfi6-Ce1ZywREiWpf2_eMBf-ZU",
  authDomain: "mcdonald-55044.firebaseapp.com",
  projectId: "mcdonald-55044",
  storageBucket: "mcdonald-55044.appspot.com",
  messagingSenderId: "834401725032",
  appId: "1:834401725032:web:e2bebb8a90dd3a4dd2e9dd",
  measurementId: "G-30TX26CNNC",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };
