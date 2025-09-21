# Firebase Service Account Setup for VS Code
# This allows permanent authentication without browser dependency

# Step 1: Create Service Account (via Firebase Console or gcloud CLI)
# Go to: https://console.firebase.google.com/project/studio-7308845117-ec2b2/settings/serviceaccounts/adminsdk

# Step 2: Download the service account key JSON file
# Save as: E:\CogniDesk\firebase-service-account-key.json

# Step 3: Set environment variable
# Windows CMD:
# set GOOGLE_APPLICATION_CREDENTIALS=E:\CogniDesk\firebase-service-account-key.json

# Windows PowerShell:
# $env:GOOGLE_APPLICATION_CREDENTIALS="E:\CogniDesk\firebase-service-account-key.json"

# Step 4: Alternative - Use Firebase CLI token
# Generate CI token: firebase login:ci
# Set token: set FIREBASE_TOKEN=your-generated-token

# Step 5: VS Code Integration
# Add to .env.local:
# GOOGLE_APPLICATION_CREDENTIALS=E:\CogniDesk\firebase-service-account-key.json
# FIREBASE_PROJECT_ID=studio-7308845117-ec2b2

echo "Firebase Service Account Setup Instructions"
echo "=========================================="
echo ""
echo "1. Visit Firebase Console:"
echo "   https://console.firebase.google.com/project/studio-7308845117-ec2b2/settings/serviceaccounts/adminsdk"
echo ""
echo "2. Click 'Generate new private key'"
echo ""
echo "3. Save the JSON file as:"
echo "   E:\CogniDesk\firebase-service-account-key.json"
echo ""
echo "4. Set environment variable:"
echo "   set GOOGLE_APPLICATION_CREDENTIALS=E:\CogniDesk\firebase-service-account-key.json"
echo ""
echo "5. Test authentication:"
echo "   firebase projects:list"
echo ""