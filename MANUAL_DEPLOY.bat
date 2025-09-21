@echo off
echo 🚀 CogniDesk - Manual Deployment to Firebase App Hosting
echo ===================================================

echo 📋 Step 1: Building Next.js application...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed! Check the output above.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

echo 📤 Step 2: Deploying to Firebase App Hosting...
call firebase apphosting:backends:create --project=studio-7308845117-ec2b2
call firebase deploy --project=studio-7308845117-ec2b2
if %ERRORLEVEL% neq 0 (
    echo ❌ Deployment failed! Check the output above.
    pause
    exit /b 1
)

echo ✅ Deployment completed successfully!

echo 🌐 Your app is live at: https://studio-7308845117-ec2b2--cognidesk-main.web.app
echo 📊 Firebase Console: https://console.firebase.google.com/project/studio-7308845117-ec2b2

echo.
echo 🎉 CogniDesk deployment complete!
pause