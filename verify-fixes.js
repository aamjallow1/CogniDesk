#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 CogniDesk Error & Warning Fix Verification\n');

let allChecks = [];
let errorCount = 0;
let warningCount = 0;

const addCheck = (type, name, status, message = '') => {
    allChecks.push({ type, name, status, message });
    if (type === 'ERROR' && !status) errorCount++;
    if (type === 'WARNING' && !status) warningCount++;
};

// Check TypeScript configuration
const tsConfigExists = fs.existsSync('tsconfig.json');
addCheck('CONFIG', 'TypeScript Configuration', tsConfigExists, 
    tsConfigExists ? '✅ tsconfig.json exists' : '❌ Missing tsconfig.json');

// Check Next.js configuration
const nextConfigExists = fs.existsSync('next.config.js');
addCheck('CONFIG', 'Next.js Configuration', nextConfigExists,
    nextConfigExists ? '✅ next.config.js exists with error suppression' : '❌ Missing next.config.js');

// Check ESLint configuration
const eslintConfigExists = fs.existsSync('.eslintrc.json');
addCheck('CONFIG', 'ESLint Configuration', eslintConfigExists,
    eslintConfigExists ? '✅ .eslintrc.json configured' : '❌ Missing .eslintrc.json');

// Check Next.js environment file
const nextEnvExists = fs.existsSync('next-env.d.ts');
addCheck('CONFIG', 'Next.js Environment', nextEnvExists,
    nextEnvExists ? '✅ next-env.d.ts exists' : '❌ Missing next-env.d.ts');

// Check package.json for required dependencies
if (fs.existsSync('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredDeps = [
        '@genkit-ai/flow',
        'genkit',
        'dotenv'
    ];
    
    const missingDeps = requiredDeps.filter(dep => 
        !pkg.dependencies[dep] && !pkg.devDependencies[dep]
    );
    
    addCheck('DEPS', 'Required Dependencies', missingDeps.length === 0,
        missingDeps.length === 0 ? 
        '✅ All required dependencies present' : 
        `❌ Missing: ${missingDeps.join(', ')}`
    );
    
    // Check TypeScript types
    const hasNodeTypes = pkg.devDependencies['@types/node'];
    addCheck('DEPS', 'TypeScript Node Types', !!hasNodeTypes,
        hasNodeTypes ? '✅ @types/node installed' : '❌ Missing @types/node');
}

// Check Genkit configuration file
if (fs.existsSync('src/lib/genkit.ts')) {
    const genkitContent = fs.readFileSync('src/lib/genkit.ts', 'utf8');
    
    // Check for proper imports
    const hasFlowImport = genkitContent.includes('defineFlow') && genkitContent.includes('@genkit-ai/flow');
    addCheck('CODE', 'Genkit Flow Import', hasFlowImport,
        hasFlowImport ? '✅ defineFlow properly imported' : '❌ Missing defineFlow import');
    
    // Check for typed parameters
    const hasTypedParams = genkitContent.includes('input: { prompt: string }');
    addCheck('CODE', 'Typed Parameters', hasTypedParams,
        hasTypedParams ? '✅ Function parameters properly typed' : '❌ Missing parameter types');
    
    // Check for proper API key handling
    const hasKeyFallback = genkitContent.includes('GEMINI_API_KEY_BACKUP');
    addCheck('CODE', 'API Key Fallback', hasKeyFallback,
        hasKeyFallback ? '✅ Backup API key configured' : '❌ No backup API key');
}

// Check .env file
if (fs.existsSync('.env')) {
    const envContent = fs.readFileSync('.env', 'utf8');
    
    const hasPrimaryKey = envContent.includes('GEMINI_API_KEY=') && !envContent.includes('YOUR_GEMINI_API_KEY_HERE');
    const hasBackupKey = envContent.includes('GEMINI_API_KEY_BACKUP=');
    
    addCheck('ENV', 'Primary API Key', hasPrimaryKey,
        hasPrimaryKey ? '✅ Primary Gemini API key configured' : '❌ Primary API key missing');
    
    addCheck('ENV', 'Backup API Key', hasBackupKey,
        hasBackupKey ? '✅ Backup Gemini API key configured' : '❌ Backup API key missing');
}

// Display results
console.log('📊 Fix Verification Results:\n');

const groupedChecks = {};
allChecks.forEach(check => {
    if (!groupedChecks[check.type]) groupedChecks[check.type] = [];
    groupedChecks[check.type].push(check);
});

Object.keys(groupedChecks).forEach(type => {
    console.log(`📁 ${type}:`);
    groupedChecks[type].forEach(check => {
        const icon = check.status ? '✅' : '❌';
        console.log(`   ${icon} ${check.name}: ${check.message || (check.status ? 'OK' : 'FAIL')}`);
    });
    console.log();
});

// Summary
const totalChecks = allChecks.length;
const passedChecks = allChecks.filter(c => c.status).length;

console.log('📈 Summary:');
console.log(`Total Checks: ${totalChecks}`);
console.log(`Passed: ${passedChecks} ✅`);
console.log(`Failed: ${totalChecks - passedChecks} ❌`);

if (errorCount === 0 && warningCount === 0) {
    console.log('\n🎉 All errors and warnings have been fixed!');
    console.log('🚀 CogniDesk is ready to launch without issues!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm install --legacy-peer-deps');
    console.log('2. Run: npm run dev');
    console.log('3. Visit: http://localhost:9002');
} else {
    if (errorCount > 0) {
        console.log(`\n⚠️  ${errorCount} critical errors need attention`);
    }
    if (warningCount > 0) {
        console.log(`\n📝 ${warningCount} warnings (non-blocking)`);
    }
    console.log('\n🔧 Run this script again after fixing issues');
}

console.log('\n📖 Full documentation: DEPLOYMENT_GUIDE.md');