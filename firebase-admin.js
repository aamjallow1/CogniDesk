const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "cognidesk-ai-unified"
});

console.log("✅ Firebase Admin SDK initialized successfully");
console.log("🔗 Project:", serviceAccount.project_id);
console.log("📧 Service Account:", serviceAccount.client_email);

module.exports = admin;