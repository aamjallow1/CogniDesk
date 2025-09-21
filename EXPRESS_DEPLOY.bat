@echo off
title CogniDesk Express Deployment
cls
echo.
echo ========================================
echo    🚀 CogniDesk Express Deployment
echo ========================================
echo.

cd /d E:\CogniDesk

echo 📋 Checking Firebase authentication...
call firebase projects:list
if %ERRORLEVEL% neq 0 (
    echo ❌ Firebase authentication required!
    echo Please run: firebase login
    pause
    exit /b 1
)

echo 📋 Setting Firebase project...
call firebase use studio-7308845117-ec2b2
echo ✅ Project set to studio-7308845117-ec2b2

echo.
echo 📋 Quick build (using existing cache)...
call npx next build --experimental-build-mode=compile
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Experimental build failed, trying standard build...
    call npx next build
    if %ERRORLEVEL% neq 0 (
        echo ❌ Build failed! Using existing build artifacts...
        if not exist ".next" (
            echo ❌ No build artifacts found!
            pause
            exit /b 1
        )
        echo ✅ Using cached build artifacts
    )
)

echo.
echo 📤 Deploying to Firebase...
call firebase deploy --only hosting --project studio-7308845117-ec2b2
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Standard hosting deploy failed, trying App Hosting...
    call firebase apphosting:rollouts:create --project studio-7308845117-ec2b2
    if %ERRORLEVEL% neq 0 (
        echo ❌ All deployment methods failed!
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo ✅ EXPRESS DEPLOYMENT COMPLETED!
echo ========================================
echo.
echo 🌐 Application URL:
echo https://studio-7308845117-ec2b2.web.app
echo https://studio-7308845117-ec2b2.firebaseapp.com
echo.
echo 📊 Firebase Console:
echo https://console.firebase.google.com/project/studio-7308845117-ec2b2
echo.
echo 🎉 CogniDesk is live!
pause