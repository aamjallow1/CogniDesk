// Quick test to verify your Gemini API key works
require('dotenv').config();

async function testGeminiAPI() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        console.log('❌ Gemini API key not set in .env file');
        return;
    }

    console.log('🔑 API Key found:', apiKey.substring(0, 20) + '...');

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (response.ok) {
            console.log('✅ Gemini API key is valid and working!');
            console.log('🎉 Your CogniDesk is ready to launch!');
        } else {
            console.log('❌ Invalid API key or quota exceeded');
            console.log('Response:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error testing API:', error.message);
    }
}

testGeminiAPI();