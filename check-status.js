#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 CogniDesk Configuration Status Check\n');

let allGood = true;

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.log('❌ Not in CogniDesk project directory');
    process.exit(1);
}

console.log('✅ In CogniDesk project directory');

// Check package.json
try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`✅ Project: ${pkg.name} v${pkg.version}`);
} catch (error) {
    console.log('❌ Invalid package.json');
    allGood = false;
}

// Check service account key
if (fs.existsSync('serviceAccountKey.json')) {
    try {
        const serviceAccount = JSON.parse(fs.readFileSync('serviceAccountKey.json', 'utf8'));
        if (serviceAccount.project_id === 'studio-7308845117-ec2b2') {
            console.log('✅ Firebase service account key configured');
        } else {
            console.log('⚠️  Service account key project ID mismatch');
            allGood = false;
        }
    } catch (error) {
        console.log('❌ Invalid service account key file');
        allGood = false;
    }
} else {
    console.log('❌ Missing serviceAccountKey.json');
    allGood = false;
}

// Check .env file
if (fs.existsSync('.env')) {
    const envContent = fs.readFileSync('.env', 'utf8');
    const envLines = envContent.split('\n');

    let hasFirebaseConfig = false;
    let hasGeminiKey = false;
    let hasBackupGeminiKey = false;
    let hasAdminConfig = false;

    for (const line of envLines) {
        if (line.includes('NEXT_PUBLIC_FIREBASE_API_KEY') && !line.includes('your-')) {
            hasFirebaseConfig = true;
        }
        if (line.includes('GEMINI_API_KEY=') && !line.includes('YOUR_GEMINI_API_KEY_HERE')) {
            hasGeminiKey = true;
        }
        if (line.includes('GEMINI_API_KEY_BACKUP=') && !line.includes('YOUR_GEMINI_API_KEY_HERE')) {
            hasBackupGeminiKey = true;
        }
        if (line.includes('FIREBASE_CLIENT_EMAIL') && line.includes('@studio-7308845117-ec2b2.iam.gserviceaccount.com')) {
            hasAdminConfig = true;
        }
    }

    if (hasFirebaseConfig) {
        console.log('✅ Firebase client configuration');
    } else {
        console.log('❌ Missing Firebase client configuration');
        allGood = false;
    }

    if (hasAdminConfig) {
        console.log('✅ Firebase admin configuration');
    } else {
        console.log('❌ Missing Firebase admin configuration');
        allGood = false;
    }

    if (hasGeminiKey) {
        console.log('✅ Gemini API key configured');
        if (hasBackupGeminiKey) {
            console.log('✅ Backup Gemini API key configured (redundancy enabled)');
        }
    } else {
        console.log('⚠️  Gemini API key not set (get from https://makersuite.google.com/app/apikey)');
    }
} else {
    console.log('❌ Missing .env file');
    allGood = false;
}

// Check Firebase configuration files
const configFiles = [
    'firebase.json',
    'firestore.rules',
    'lib/firebase.js',
    'lib/firebase-admin.js',
    'src/lib/genkit.ts'
];

for (const file of configFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing ${file}`);
        allGood = false;
    }
}

// Check node_modules
if (fs.existsSync('node_modules')) {
    console.log('✅ Dependencies installed');
} else {
    console.log('⚠️  Dependencies not installed - run: npm install');
}

console.log('\n📋 Summary:');

if (allGood) {
    console.log('🎉 All core configurations are ready!');
    console.log('\n🚀 Next steps:');
    console.log('1. Ensure Gemini API key is set in .env');
    console.log('2. Run: npm install (if not done)');
    console.log('3. Start development:');
    console.log('   Terminal 1: npm run dev');
    console.log('   Terminal 2: npm run genkit:dev');
    console.log('4. Visit: http://localhost:9002');
} else {
    console.log('⚠️  Some configurations need attention');
    console.log('Please fix the issues above before proceeding');
}

console.log('\n📖 Full documentation: DEPLOYMENT_GUIDE.md');
console.log('🔧 Quick setup: Run setup.bat (Windows)');