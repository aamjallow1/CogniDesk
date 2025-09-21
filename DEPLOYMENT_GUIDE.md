# 🚀 CogniDesk Firebase Deployment Guide

## 📋 Overview
Complete setup guide for deploying CogniDesk - Your Intelligent Desktop AI Assistant with Firebase integration.

## 🔑 Your Firebase Configuration

**Project Details:**
- Project ID: `studio-7308845117-ec2b2`
- Project Number: `745224953184`
- Web API Key: `AIzaSyAJOEvpyoR9pEH_mhR126A84RqagezCez4`
- App ID: `1:745224953184:web:b07106875a19c2dc00d205`

## 📁 Project Structure Created

```
E:\CogniDesk/
├── .env                          # Environment variables
├── package.json                  # Project dependencies
├── firebase.json                 # Firebase configuration
├── firestore.rules              # Database security rules
├── serviceAccountKey.json.example # Service account template
├── lib/
│   ├── firebase.js              # Client-side Firebase config
│   └── firebase-admin.js        # Server-side Firebase config
└── src/lib/
    └── genkit.ts                # AI agents and flows
```

## 🔧 Setup Steps

### 1. Get Required API Keys

#### A. Gemini API Key (Required for AI features)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and update your `.env` file:
   ```bash
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

#### B. Firebase Admin Service Account (Required for server operations)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `studio-7308845117-ec2b2`
3. Click **Settings** ⚙️ → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file
7. Rename it to `serviceAccountKey.json` and place in your project root

### 2. Install Dependencies

```bash
cd E:\CogniDesk
npm install
```

### 3. Enable Firebase Services

In [Firebase Console](https://console.firebase.google.com/project/studio-7308845117-ec2b2):

1. **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable Email/Password and Google providers

2. **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Deploy security rules: `firebase deploy --only firestore:rules`

3. **Storage** (if using file uploads):
   - Go to Storage
   - Get started with default settings

### 4. Deploy Firestore Security Rules

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not done)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules
```

### 5. Development Setup

**Terminal 1 - Next.js Frontend:**
```bash
npm run dev
```

**Terminal 2 - Genkit AI Backend:**
```bash
npm run genkit:dev
```

Your app will run at: `http://localhost:9002`

### 6. Production Deployment

#### Option A: Firebase Hosting
```bash
# Build the project
npm run build
npm run export

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

#### Option B: Firebase App Hosting (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/project/studio-7308845117-ec2b2)
2. Navigate to **App Hosting** (Beta)
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `out`
   - Environment variables: Add your `.env` variables

## 🔒 Security Configuration

### Firestore Rules (Already Created)
The security rules ensure:
- Users can only access their own data
- Authentication is required for all operations
- Proper data isolation between users

### Environment Variables for Production
Add these to your hosting platform:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyAJOEvpyoR9pEH_mhR126A84RqagezCez4"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="studio-7308845117-ec2b2.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="studio-7308845117-ec2b2"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="studio-7308845117-ec2b2.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="745224953184"
NEXT_PUBLIC_FIREBASE_APP_ID="1:745224953184:web:b07106875a19c2dc00d205"
GEMINI_API_KEY="your_gemini_api_key"
FIREBASE_ADMIN_PROJECT_ID="studio-7308845117-ec2b2"
```

## 🤖 AI Agents Configured

Your CogniDesk includes these specialized AI agents:

1. **🔍 Multi-Agent Task Router** - Routes requests to appropriate agents
2. **🌐 Web Research & Planning** - Research and strategic planning
3. **💻 Autonomous Code Genius** - Code generation and debugging
4. **🎨 Image Generation** - Text-to-image creation
5. **✍️ Story & Content Writing** - Creative writing assistance
6. **🎥 Video Analysis & Generation** - Video processing capabilities
7. **🧠 Mind Map Generation** - Concept visualization
8. **🏗️ System Design Analysis** - Architecture design
9. **⚽ Football Analysis AI** - Sports prediction and analysis

## 🧪 Testing Your Setup

1. **Local Testing:**
   ```bash
   npm run dev
   npm run genkit:dev
   ```
   Visit `http://localhost:9002`

2. **Firebase Emulators:**
   ```bash
   npm run firebase:emulators
   ```

3. **Production Testing:**
   After deployment, test all AI agents and Firebase features

## 📊 Monitoring & Analytics

- **Firebase Console**: Monitor authentication, database usage, and hosting
- **Genkit Dashboard**: Monitor AI agent performance and flows
- **Error Tracking**: Check Firebase Functions logs for any issues

## 🔄 Next Steps After Setup

1. **Customize AI Agents**: Modify prompts in `src/lib/genkit.ts`
2. **Add UI Components**: Create React components for each agent
3. **Implement Authentication**: Add login/signup flows
4. **Add File Upload**: Implement video/image upload features
5. **Connect External APIs**: Integrate additional AI services
6. **Set up Monitoring**: Add error tracking and analytics

## 🆘 Troubleshooting

### Common Issues:

1. **Missing API Key**: Ensure `GEMINI_API_KEY` is set correctly
2. **Firebase Auth Issues**: Check that providers are enabled
3. **Firestore Permissions**: Verify security rules are deployed
4. **Build Errors**: Ensure all dependencies are installed
5. **Port Conflicts**: Make sure ports 9002 and 3100 are available

### Getting Help:

- Firebase Documentation: https://firebase.google.com/docs
- Genkit Documentation: https://firebase.google.com/docs/genkit
- Next.js Documentation: https://nextjs.org/docs

## 📝 Files Created:

✅ **E:\CogniDesk\.env** - Environment configuration  
✅ **E:\CogniDesk\package.json** - Project dependencies  
✅ **E:\CogniDesk\firebase.json** - Firebase configuration  
✅ **E:\CogniDesk\firestore.rules** - Security rules  
✅ **E:\CogniDesk\lib\firebase.js** - Client Firebase config  
✅ **E:\CogniDesk\lib\firebase-admin.js** - Admin Firebase config  
✅ **E:\CogniDesk\src\lib\genkit.ts** - AI agents and flows  
✅ **E:\CogniDesk\serviceAccountKey.json.example** - Service account template  

Your CogniDesk project is now ready for deployment! 🚀