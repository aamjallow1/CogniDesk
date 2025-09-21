@echo off
echo ======================================
echo   🚀 CogniDesk Setup & Launch Script
echo ======================================
echo.

:: Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found!
    echo Please run this script from the CogniDesk project directory.
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

:: Check if serviceAccountKey.json exists
if not exist "serviceAccountKey.json" (
    echo ❌ Error: serviceAccountKey.json not found!
    echo Please copy your Firebase service account key to this directory.
    pause
    exit /b 1
)

echo ✅ Firebase service account key found

:: Check if .env exists and has Gemini API key
if not exist ".env" (
    echo ❌ Error: .env file not found!
    pause
    exit /b 1
)

findstr /C:"YOUR_GEMINI_API_KEY_HERE" .env >nul
if not errorlevel 1 (
    echo ⚠️  Warning: Please update GEMINI_API_KEY in .env file
    echo Get your API key from: https://makersuite.google.com/app/apikey
    echo.
    set /p continue="Continue anyway? (y/n): "
    if /i not "%continue%"=="y" (
        exit /b 1
    )
)

:: Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies!
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!

:: Setup Firebase CLI if not installed
firebase --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo 🔥 Installing Firebase CLI...
    call npm install -g firebase-tools
    if errorlevel 1 (
        echo ❌ Failed to install Firebase CLI!
        echo Please install manually: npm install -g firebase-tools
        pause
    )
)

echo.
echo ====================================
echo   🎉 Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Update GEMINI_API_KEY in .env file (if not done)
echo 2. Run development servers:
echo    - Terminal 1: npm run dev
echo    - Terminal 2: npm run genkit:dev
echo 3. Visit: http://localhost:9002
echo.
echo Available scripts:
echo   npm run dev          - Start Next.js development server
echo   npm run genkit:dev   - Start Genkit AI backend
echo   npm run build        - Build for production
echo   npm run firebase:deploy - Deploy to Firebase
echo.

set /p launch="Launch development servers now? (y/n): "
if /i "%launch%"=="y" (
    echo.
    echo 🚀 Starting development servers...
    echo Opening two terminals - please wait...
    
    :: Start Next.js dev server
    start "CogniDesk - Next.js" cmd /k "echo Starting Next.js development server... && npm run dev"
    
    :: Wait a bit then start Genkit
    timeout /t 3 /nobreak >nul
    start "CogniDesk - Genkit AI" cmd /k "echo Starting Genkit AI backend... && npm run genkit:dev"
    
    :: Wait a bit then open browser
    timeout /t 8 /nobreak >nul
    start http://localhost:9002
    
    echo.
    echo ✅ Development servers launched!
    echo Check the opened terminals for server status.
) else (
    echo.
    echo 💡 To start development manually:
    echo    Terminal 1: npm run dev
    echo    Terminal 2: npm run genkit:dev
)

echo.
pause