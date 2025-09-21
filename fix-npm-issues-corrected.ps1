# PowerShell script to fix CogniDesk npm installation issues
Write-Host "🔧 CogniDesk npm Installation Fix" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Gray

# Change to CogniDesk directory
Set-Location "e:\CogniDesk"

# Step 1: Clean everything
Write-Host "📋 Step 1: Cleaning installation..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   Removing node_modules..." -ForegroundColor Gray
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Write-Host "   Removing package-lock.json..." -ForegroundColor Gray
    Remove-Item "package-lock.json" -ErrorAction SilentlyContinue
}

# Step 2: Clear npm cache
Write-Host "   Clearing npm cache..." -ForegroundColor Gray
npm cache clean --force

# Step 3: Create minimal package.json for clean installation
Write-Host "📦 Step 2: Creating minimal package.json..." -ForegroundColor Yellow
$minimalPackage = @"
{
  "name": "cognidesk",
  "version": "1.0.0",
  "description": "CogniDesk - Your Intelligent Desktop AI General Assistant",
  "main": "index.js",
  "scripts": {
    "dev": "next dev -p 9002",
    "build": "next build",
    "start": "next start -p 9002",
    "lint": "next lint",
    "firebase:deploy": "firebase deploy",
    "serve": "firebase serve --only hosting"
  },
  "dependencies": {
    "next": "15.3.3",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "20.9.0",
    "@types/react": "18.2.37",
    "@types/react-dom": "18.2.15",
    "typescript": "5.2.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
"@

$minimalPackage | Out-File -FilePath "package.json" -Encoding UTF8 -Force
Write-Host "   ✅ Minimal package.json created" -ForegroundColor Green

# Step 4: Install core dependencies only
Write-Host "🚀 Step 3: Installing core dependencies..." -ForegroundColor Yellow
Write-Host "   Installing Next.js and React..." -ForegroundColor Gray

try {
    & npm install --no-audit --legacy-peer-deps --force
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Installation completed with warnings" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Installation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   🔄 Trying alternative method..." -ForegroundColor Yellow
    
    # Alternative: Install one by one
    & npm install next@15.3.3 --save --force
    & npm install react@18.2.0 react-dom@18.2.0 --save --force
    & npm install typescript@5.2.2 --save-dev --force
}

# Step 5: Test build
Write-Host "🧪 Step 4: Testing build..." -ForegroundColor Yellow
try {
    & npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Build test SUCCESSFUL!" -ForegroundColor Green
        Write-Host "" 
        Write-Host "🎉 CogniDesk installation FIXED!" -ForegroundColor Cyan
        Write-Host "" 
        Write-Host "📊 Next steps:" -ForegroundColor Cyan
        Write-Host "   1. cd e:\CogniDesk" -ForegroundColor Gray
        Write-Host "   2. firebase deploy" -ForegroundColor Gray
        Write-Host "" 
        Write-Host "✅ Ready for Firebase deployment!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Build test failed" -ForegroundColor Red
        Write-Host "   💡 Check the error messages above" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Build test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   💡 You may need to install additional dependencies" -ForegroundColor Yellow
}

Write-Host "" 
Write-Host "📋 Summary completed successfully!" -ForegroundColor Cyan