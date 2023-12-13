#!/bin/bash
# bash 자동화 스크립트 실행 전, 디렉토리는 build를 생성할 상위 디렉토리이어야 한다.
# deploy.sh는 프로젝트 디렉토리에서 실행해야 한다.

# Remove build file.
rm -rf build

# Remove IPK file.
rm -rf IPK

# Build the project
npm run build

# Change to the build directory
cd build

# Create appinfo.json and add content
printf '{\n "id": "kr.ac.knu.app.signage",\n "version": "1.0.0",\n "vendor": "My Company",\n "type": "web",\n "main": "index.html",\n "title": "new app",\n "icon": "icon.png",\n "allowVideoCapture": true,\n "requiredPermissions": [ "time.query", "activity.operation" ]\n}' > appinfo.json

# Copy the icon.png file
cp ../icon.png icon.png

# Package the application
ares-package . -o ../IPK

# Change to the IPK directory
cd ../IPK

# Remove existing installation
ares-install -d jongmal -r kr.ac.knu.app.signage

# Install the new package
ares-install -d jongmal kr.ac.knu.app.signage_1.0.0_all.ipk

# Launch the app
ares-launch -d jongmal kr.ac.knu.app.signage

# Open inspector
ares-inspect -d jongmal --app kr.ac.knu.app.signage

# Change directory
cd ..