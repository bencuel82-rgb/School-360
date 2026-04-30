import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase API key is missing. Please set VITE_FIREBASE_API_KEY in your environment variables.");
    // Return a dummy app or handle accordingly. For now, we'll try to initialize but catch errors elsewhere.
  }
  
  return initializeApp(firebaseConfig);
}

const app = getFirebaseApp();

export const db: Firestore = getFirestore(app, import.meta.env.VITE_FIREBASE_DATABASE_ID); 
export const auth: Auth = getAuth(app);
