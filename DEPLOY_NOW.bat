@echo off
echo 🚀 CogniDesk - Direct Firebase App Hosting Deployment
echo ===================================================

cd /d E:\CogniDesk

echo 📋 Building application...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo 📤 Deploying to Firebase App Hosting...
call firebase deploy --project=studio-7308845117-ec2b2
if %ERRORLEVEL% neq 0 (
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo ✅ Deployment Complete!
echo 🌐 Your app is live at: https://studio-7308845117-ec2b2--cognidesk-main.web.app
pause