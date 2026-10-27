import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ضفنا ده عشان نستخدم قاعدة البيانات

const firebaseConfig = {
  apiKey: "AIzaSyDBj3FYo6PX2nCZdAd3PIbZObq2BVkDerE",
  authDomain: "ebny-ebnak.firebaseapp.com",
  projectId: "ebny-ebnak",
  storageBucket: "ebny-ebnak.firebasestorage.app",
  messagingSenderId: "220115899939",
  appId: "1:220115899939:web:ea900dae88d60301448396"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير قاعدة البيانات عشان نستخدمها في باقي الملفات
export const db = getFirestore(app);