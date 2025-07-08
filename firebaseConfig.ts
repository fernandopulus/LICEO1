// src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyCRGP5LsVtqffRgrO9v4mBmMejiv_zQHfg",
  authDomain: "ducateur-adaptatif.firebaseapp.com",
  projectId: "ducateur-adaptatif",
  storageBucket: "ducateur-adaptatif.firebasestorage.app",
  messagingSenderId: "150774207256",
  appId: "1:150774207256:web:f60f532202e405903b446d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (base de datos)
export const db = getFirestore(app);
