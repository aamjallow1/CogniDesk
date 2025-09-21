@echo off
title Simple Firebase Deployment
cls
cd /d E:\CogniDesk

echo 🔥 Simple Firebase Static Deployment
echo =====================================
echo.

REM Create a simple static version
if not exist "dist" mkdir dist
if not exist "dist\index.html" (
    echo Creating basic index.html...
    echo ^<!DOCTYPE html^> > dist\index.html
    echo ^<html^> >> dist\index.html
    echo ^<head^> >> dist\index.html
    echo ^<title^>CogniDesk - Loading...^</title^> >> dist\index.html
    echo ^<meta charset="utf-8"^> >> dist\index.html
    echo ^<meta name="viewport" content="width=device-width, initial-scale=1"^> >> dist\index.html
    echo ^<script^>window.location.href = 'https://studio-7308845117-ec2b2--cognidesk-main.web.app';^</script^> >> dist\index.html
    echo ^</head^> >> dist\index.html
    echo ^<body^> >> dist\index.html
    echo ^<h1^>CogniDesk Loading...^</h1^> >> dist\index.html
    echo ^<p^>Redirecting to CogniDesk AI Workspace...^</p^> >> dist\index.html
    echo ^</body^> >> dist\index.html
    echo ^</html^> >> dist\index.html
)

REM Update firebase.json for simple hosting
echo {> firebase_simple.json
echo   "hosting": {>> firebase_simple.json
echo     "public": "dist",>> firebase_simple.json
echo     "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]>> firebase_simple.json
echo   }>> firebase_simple.json
echo }>> firebase_simple.json

echo 📤 Deploying simple static site...
firebase deploy --config firebase_simple.json --project studio-7308845117-ec2b2

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✅ SUCCESS! CogniDesk deployed to Firebase!
    echo 🌐 Visit: https://studio-7308845117-ec2b2.web.app
    echo.
) else (
    echo ❌ Deployment failed
)

pause