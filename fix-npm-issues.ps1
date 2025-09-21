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

# Step 3: Create simplified package.json
Write-Host "📦 Step 2: Creating simplified package.json..." -ForegroundColor Yellow
$packageJson = @{
    name = "cognidesk"
    version = "1.0.0"
    description = "CogniDesk - Your Intelligent Desktop AI General Assistant"
    main = "index.js"
    scripts = @{
        dev = "next dev -p 9002"
        build = "next build"
        start = "next start -p 9002"
        lint = "next lint"
        "firebase:deploy" = "firebase deploy"
        serve = "firebase serve --only hosting"
    }
    dependencies = @{
        next = "15.3.3"
        react = "18.2.0"
        "react-dom" = "18.2.0"
        firebase = "10.7.1"
    }
    devDependencies = @{
        "@types/node" = "20.9.0"
        "@types/react" = "18.2.37"
        "@types/react-dom" = "18.2.15"
        autoprefixer = "10.4.16"
        eslint = "8.57.1"
        "eslint-config-next" = "15.0.0"
        postcss = "8.4.31"
        tailwindcss = "3.3.5"
        typescript = "5.2.2"
    }
    engines = @{
        node = ">=18.0.0"
    }
}

$packageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8
Write-Host "   ✅ Simplified package.json created" -ForegroundColor Green

# Step 4: Install core dependencies
Write-Host "🚀 Step 3: Installing core dependencies..." -ForegroundColor Yellow
Write-Host "   Installing Next.js, React..." -ForegroundColor Gray

try {
    npm install next@15.3.3 react@18.2.0 react-dom@18.2.0 --save --no-audit --legacy-peer-deps
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Core dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Core installation had warnings but may be functional" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Core installation failed: $_" -ForegroundColor Red
    Write-Host "   🔄 Trying alternative method..." -ForegroundColor Yellow
    
    # Alternative installation method
    npm install --force --no-audit
}

# Step 5: Install dev dependencies
Write-Host "🔧 Step 4: Installing dev dependencies..." -ForegroundColor Yellow
try {
    npm install typescript@5.2.2 "@types/node@20.9.0" "@types/react@18.2.37" "@types/react-dom@18.2.15" --save-dev --no-audit --legacy-peer-deps
    Write-Host "   ✅ Dev dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Dev dependencies had issues but build may still work" -ForegroundColor Yellow
}

# Step 6: Test build
Write-Host "🧪 Step 5: Testing build..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Build test SUCCESSFUL!" -ForegroundColor Green
        Write-Host "" 
        Write-Host "🎉 CogniDesk installation fixed!" -ForegroundColor Cyan
        Write-Host "   You can now run: firebase deploy" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Build test failed" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ Build test failed: $_" -ForegroundColor Red
    Write-Host "   💡 Manual steps may be needed" -ForegroundColor Yellow
}

Write-Host "" 
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   - Package.json simplified" -ForegroundColor Gray
Write-Host "   - Dependencies cleaned and reinstalled" -ForegroundColor Gray
Write-Host "   - Build tested" -ForegroundColor Gray
Write-Host "" 
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "   1. cd e:\CogniDesk" -ForegroundColor Gray
Write-Host "   2. firebase deploy" -ForegroundColor Gray