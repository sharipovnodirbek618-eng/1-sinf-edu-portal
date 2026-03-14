import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcEZSOp6bX7_bFdOHb3yd9DGda2OnwtK8",
  authDomain: "sinf-edu-portal.firebaseapp.com",
  projectId: "sinf-edu-portal",
  storageBucket: "sinf-edu-portal.firebasestorage.app",
  messagingSenderId: "69761520931",
  appId: "1:69761520931:web:cf583309c2b8cc1abe2896",
  measurementId: "G-GPESYJGCHR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const ADMIN_EMAIL = "sharipovnodirbek618@gmail.com";
