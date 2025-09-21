// lib/firebase-admin.js
const admin = require("firebase-admin");

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
    let serviceAccount;

    try {
        // Try to load service account from file
        serviceAccount = require("../serviceAccountKey.json");
    } catch (error) {
        console.log("Service account file not found, using environment variables");

        // Use environment variables if service account file is not available
        serviceAccount = {
            type: "service_account",
            project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
        };
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || "studio-7308845117-ec2b2",
        storageBucket: `${process.env.FIREBASE_ADMIN_PROJECT_ID || "studio-7308845117-ec2b2"}.appspot.com`
    });
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();
const adminStorage = admin.storage();

module.exports = { admin, adminAuth, adminDb, adminStorage };