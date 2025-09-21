// Simple Gemini API test without dependencies
const apiKey = "AIzaSyBnR_NrXZ_icWhfWmnq7Hahaoq7sOCz9WY";

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
                        text: 'Say "Hello! Your CogniDesk AI assistant is working!" in exactly those words.'
                    }]
                }]
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('\n✅ API Test Successful!');
            console.log('🤖 Gemini Response:', data.candidates[0].content.parts[0].text);
            console.log('\n🎉 Your CogniDesk is 100% ready to launch!');
            console.log('\n🚀 Next steps:');
            console.log('1. Run: npm install');
            console.log('2. Run: npm run dev');
            console.log('3. In another terminal: npm run genkit:dev');
            console.log('4. Visit: http://localhost:9002');
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