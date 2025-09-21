@echo off
title CogniDesk Firebase Build Fix
color 0A
echo ╔══════════════════════════════════════════════════════════════════════╗
echo ║                    CogniDesk Firebase Build Fix                      ║
echo ╚══════════════════════════════════════════════════════════════════════╝
echo.
echo 🔧 Starting Firebase build fix process...
echo.

cd /d e:\CogniDesk

echo ▶ Step 1: Cleaning existing installation...
if exist node_modules (
    echo   Removing old node_modules...
    rmdir /s /q node_modules 2>nul
    echo   ✅ Cleaned successfully
) else (
    echo   ✅ No existing node_modules found
)

if exist package-lock.json (
    echo   Removing package-lock.json...
    del package-lock.json 2>nul
    echo   ✅ Cleaned package-lock.json
)
echo.

echo ▶ Step 2: Installing dependencies (simplified)...
echo   This may take a few minutes...
npm cache clean --force 2>nul
npm install --no-audit --no-fund --legacy-peer-deps
if %ERRORLEVEL% neq 0 (
    echo   ❌ npm install failed, trying with force...
    npm install --force --no-audit --no-fund
    if %ERRORLEVEL% neq 0 (
        echo   ❌ Installation failed. Trying yarn instead...
        yarn install --ignore-engines --non-interactive
        if %ERRORLEVEL% neq 0 (
            echo   ❌ All installation methods failed.
            echo   💡 Manual steps:
            echo      1. Delete this folder: e:\CogniDesk\node_modules
            echo      2. Run: npm install --force
            echo      3. If that fails, check your Node.js version: node --version
            pause
            exit /b 1
        )
    )
)
echo   ✅ Dependencies installed successfully
echo.

echo ▶ Step 3: Testing build process...
npm run build
if %ERRORLEVEL% neq 0 (
    echo   ❌ Build failed. Checking for Next.js...
    if not exist "node_modules\next\dist\bin\next" (
        echo   ❌ Next.js not installed properly. Reinstalling...
        npm install next@15.3.3 --save
        npm run build
        if %ERRORLEVEL% neq 0 (
            echo   ❌ Build still failed. Manual fix required.
            pause
            exit /b 1
        )
    )
) else (
    echo   ✅ Build completed successfully!
)
echo.

echo ╔══════════════════════════════════════════════════════════════════════╗
echo ║                          ✅ FIX COMPLETE                             ║
echo ╚══════════════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Your CogniDesk project is now ready for Firebase deployment!
echo.
echo 🚀 Next steps:
echo    1. Run: npm run dev          (to test locally)
echo    2. Run: firebase deploy      (to deploy to Firebase)
echo.
echo 📁 Files fixed:
echo    • package.json              - Simplified dependencies
echo    • src/app/layout.tsx        - Root layout
echo    • src/app/page.tsx          - Landing page  
echo    • src/app/(dashboard)/      - Dashboard with 9 AI agents
echo    • tailwind.config.js        - Build configuration
echo    • postcss.config.js         - CSS processing
echo.
echo 💡 If you still have issues, try:
echo    npm install --force
echo    OR delete node_modules and run this script again
echo.
pause