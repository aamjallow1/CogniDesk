@echo off
cd /d e:\CogniDesk
echo Installing dependencies...
npm install
echo Build test...
npm run build
echo Installation complete!
pause