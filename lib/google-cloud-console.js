// lib/google-cloud-console.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Google Cloud Console Integration
export class GoogleCloudConsoleIntegration {
    constructor() {
        this.projectId = process.env.GOOGLE_CLOUD_PROJECT || 'studio-7308845117-ec2b2';
        this.consoleUrl = process.env.GOOGLE_CLOUD_CONSOLE_URL;
        this.auth = auth;
        this.provider = new GoogleAuthProvider();

        // Add additional scopes for Google Cloud Console access
        this.provider.addScope('https://www.googleapis.com/auth/cloud-platform');
        this.provider.addScope('https://www.googleapis.com/auth/firebase');
        this.provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        this.provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    }

    /**
     * Sign in with Google Cloud Console authentication
     */
    async signInWithGoogleCloud() {
        try {
            const result = await signInWithPopup(this.auth, this.provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            return {
                success: true,
                user,
                token,
                projectId: this.projectId,
                consoleAccess: true
            };
        } catch (error) {
            console.error('Google Cloud Console sign-in error:', error);
            return {
                success: false,
                error: error.message,
                code: error.code
            };
        }
    }

    /**
     * Sign in with redirect (useful for mobile)
     */
    async signInWithGoogleCloudRedirect() {
        try {
            await signInWithRedirect(this.auth, this.provider);
        } catch (error) {
            console.error('Google Cloud Console redirect sign-in error:', error);
            throw error;
        }
    }

    /**
     * Get current authentication state
     */
    getCurrentUser() {
        return this.auth.currentUser;
    }

    /**
     * Sign out from Google Cloud Console
     */
    async signOut() {
        try {
            await this.auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get Google Cloud Console URLs for the project
     */
    getConsoleUrls() {
        const baseUrl = `https://console.cloud.google.com`;

        return {
            overview: `${baseUrl}/home/dashboard?project=${this.projectId}`,
            auth: `${baseUrl}/auth/overview?project=${this.projectId}`,
            firebase: `${baseUrl}/firebase?project=${this.projectId}`,
            apis: `${baseUrl}/apis/dashboard?project=${this.projectId}`,
            iam: `${baseUrl}/iam-admin/iam?project=${this.projectId}`,
            storage: `${baseUrl}/storage/browser?project=${this.projectId}`,
            logs: `${baseUrl}/logs/query?project=${this.projectId}`,
            monitoring: `${baseUrl}/monitoring?project=${this.projectId}`,
            functions: `${baseUrl}/functions/list?project=${this.projectId}`,
            appengine: `${baseUrl}/appengine?project=${this.projectId}`,
            compute: `${baseUrl}/compute/instances?project=${this.projectId}`,
            sql: `${baseUrl}/sql/instances?project=${this.projectId}`,
            aiplatform: `${baseUrl}/ai/platform?project=${this.projectId}`
        };
    }

    /**
     * Check if user has project access
     */
    async checkProjectAccess(user) {
        try {
            // This would typically make an API call to check permissions
            // For now, we'll check if the user's email domain matches expected domains
            const allowedDomains = ['gmail.com', 'googlemail.com']; // Add your domains
            const userDomain = user.email.split('@')[1];

            return {
                hasAccess: allowedDomains.includes(userDomain) || user.email.includes('firebase'),
                email: user.email,
                projectId: this.projectId
            };
        } catch (error) {
            console.error('Project access check error:', error);
            return { hasAccess: false, error: error.message };
        }
    }

    /**
     * Get project information
     */
    getProjectInfo() {
        return {
            projectId: this.projectId,
            projectNumber: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            consoleUrl: this.consoleUrl,
            region: 'us-central1', // Default region
            services: {
                firebase: true,
                firestore: true,
                auth: true,
                functions: true,
                hosting: true,
                storage: true
            }
        };
    }

    /**
     * Open Google Cloud Console in new tab
     */
    openConsole(service = 'overview') {
        const urls = this.getConsoleUrls();
        const url = urls[service] || urls.overview;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    /**
     * Monitor authentication state changes
     */
    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(callback);
    }
}

// Export singleton instance
export const googleCloudConsole = new GoogleCloudConsoleIntegration();
export default googleCloudConsole;