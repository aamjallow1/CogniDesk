@echo off
echo 🔑 Testing Gemini API Key...
echo.

REM Check if API key is set
if "%GEMINI_API_KEY%"=="" (
    echo ❌ GEMINI_API_KEY environment variable not set
    echo Please set it first: set GEMINI_API_KEY=your_actual_key_here
    pause
    exit /b 1
)

echo 🚀 Making API call to Gemini...
echo.

curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" ^
  -H "Content-Type: application/json" ^
  -H "X-goog-api-key: %GEMINI_API_KEY%" ^
  -X POST ^
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Explain how AI works in a few words\"}]}]}"

echo.
echo.
echo ✅ Test completed!
pause