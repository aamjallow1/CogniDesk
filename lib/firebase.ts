// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJOEvpyoR9pEH_mhR126A84RqagezCez4",
    authDomain: "studio-7308845117-ec2b2.firebaseapp.com",
    projectId: "studio-7308845117-ec2b2",
    storageBucket: "studio-7308845117-ec2b2.firebasestorage.app",
    messagingSenderId: "745224953184",
    appId: "1:745224953184:web:b07106875a19c2dc00d205"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service  
export const db = getFirestore(app)

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
    try {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
        connectFirestoreEmulator(db, 'localhost', 8080)
    } catch (error) {
        // Emulators already connected
    }
}

export { app }
export default app