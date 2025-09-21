@echo off
title CogniDesk Final Deployment
cls
echo.
echo ========================================
echo    🚀 CogniDesk Final Deployment
echo ========================================
echo.

cd /d E:\CogniDesk

echo 📋 Step 1: Checking project structure...
if not exist "src\app" (
    echo ❌ Error: Source files missing!
    pause
    exit /b 1
)
if not exist "package.json" (
    echo ❌ Error: package.json missing!
    pause
    exit /b 1
)
echo ✅ Project structure verified

echo.
echo 📋 Step 2: Installing dependencies...
call npm install --production
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Dependency installation had issues, continuing...
)

echo.
echo 📋 Step 3: Building application...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed! Checking for specific errors...
    echo Trying alternative build...
    call npx next build
    if %ERRORLEVEL% neq 0 (
        echo ❌ Alternative build also failed!
        pause
        exit /b 1
    )
)
echo ✅ Build completed successfully

echo.
echo 📋 Step 4: Deploying to Firebase...
call firebase deploy --project studio-7308845117-ec2b2
if %ERRORLEVEL% neq 0 (
    echo ❌ Firebase deployment failed!
    echo Trying App Hosting deployment...
    call firebase apphosting:rollouts:create --project studio-7308845117-ec2b2
    if %ERRORLEVEL% neq 0 (
        echo ❌ App Hosting deployment also failed!
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo ✅ DEPLOYMENT COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo 🌐 Your application is live at:
echo https://studio-7308845117-ec2b2--cognidesk-main.web.app
echo.
echo 📊 Firebase Console:
echo https://console.firebase.google.com/project/studio-7308845117-ec2b2
echo.
echo 📋 GitHub Repository:
echo https://github.com/aamjallow1/CogniDesk
echo.
echo 🎉 CogniDesk is now live and operational!
echo.
pause