@echo off
REM GitHub Repository Setup and Firebase Deployment Script
REM CogniDesk AI Assistant - Automated Deployment (Windows)

echo 🚀 CogniDesk GitHub Deployment Setup
echo =====================================

REM Check if git is initialized
if not exist ".git" (
    echo 📝 Initializing Git repository...
    git init
    git branch -M main
)

REM Add all files to git
echo 📁 Adding files to Git...
git add .

REM Create comprehensive commit message
set COMMIT_MSG=🚀 CogniDesk v1.0.0 - Production Ready Deployment

git commit -m "%COMMIT_MSG%"

REM Check if remote origin exists
git remote | findstr origin >nul
if errorlevel 1 (
    echo 🔗 Setting up GitHub remote...
    echo Please run the following command with your GitHub repository URL:
    echo git remote add origin https://github.com/YOUR_USERNAME/CogniDesk.git
    echo.
    echo Then run: git push -u origin main
) else (
    echo 📤 Pushing to GitHub...
    git push -u origin main
)

echo.
echo ✅ GitHub setup complete!
echo.
echo 🔥 Firebase Deployment Commands:
echo ================================
echo 1. Ensure you're authenticated: firebase login
echo 2. Set project: firebase use studio-7308845117-ec2b2  
echo 3. Deploy: firebase apphosting:rollouts:create --project studio-7308845117-ec2b2
echo.
echo 🤖 GitHub Actions will handle automatic deployments on push to main branch
echo.
echo 📱 Live URLs after deployment:
echo - App Hosting: https://studio--studio-7308845117-ec2b2.web.app
echo - Static Hosting: https://studio-7308845117-ec2b2.web.app
echo - Firebase Console: https://console.firebase.google.com/project/studio-7308845117-ec2b2
echo.
echo 🎉 CogniDesk is ready for production! 🚀

pause