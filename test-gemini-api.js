// Load API key from .env and test Gemini API
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    console.log('❌ Please update GEMINI_API_KEY in your .env file');
    console.log('Get it from: https://aistudio.google.com/app/apikey');
    process.exit(1);
}

console.log('🔑 Testing Gemini API...');
console.log('API Key (partial):', apiKey.substring(0, 20) + '...');

const testAPI = async () => {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: 'Explain how AI works in a few words'
                    }]
                }]
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('\n✅ API Test Successful!');
            console.log('🤖 Gemini Response:', data.candidates[0].content.parts[0].text);
            console.log('\n🎉 Your CogniDesk is ready to launch!');
            console.log('Run: npm run dev');
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
            const errorText = await response.text();
            console.log('Error details:', errorText);
        }
    } catch (error) {
        console.log('❌ Network Error:', error.message);
    }
};

testAPI();