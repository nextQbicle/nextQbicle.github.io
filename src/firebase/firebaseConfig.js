import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBN29j2NMRYMXdL2ihv54xo_nTf8xkh1P0",
  authDomain: "nextqbicle-3d4f7.firebaseapp.com",
  projectId: "nextqbicle-3d4f7",
  storageBucket: "nextqbicle-3d4f7.firebasestorage.app",
  messagingSenderId: "931692518668",
  appId: "1:931692518668:web:8fbe3cd772d1d747d7bd29",
  measurementId: "G-TVGFJG3KNJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;