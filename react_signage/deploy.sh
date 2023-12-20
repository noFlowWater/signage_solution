#!/bin/bash

# 도움말 메시지
usage() {
    echo ">> Usage: $0 {DEVICE_NAME} {APP_ID} {APP_VERSION} {VENDOR_NAME} {APP_TITLE}"
    echo ">> Example: $0 jongmal kr.ac.knu.app.signage 1.0.0 \"My Company\" \"new app\""
    exit 1
}

# 매개변수 유효성 검사
if [ $# -ne 5 ]; then
    echo ">> Error: Incorrect number of arguments."
    usage
fi

# 매개변수 할당
DEVICE_NAME=$1
APP_ID=$2
APP_VERSION=$3
VENDOR_NAME=$4
APP_TITLE=$5

# 매개변수 출력
echo ">> Device name: $DEVICE_NAME"
echo ">> App ID: $APP_ID"
echo ">> App version: $APP_VERSION"
echo ">> Vendor: $VENDOR_NAME"
echo ">> App title: $APP_TITLE"

# 프로젝트 빌드
echo ">> Building the project..."
npm run build

# Build directory로 변경
cd build
echo ">> Changed to build directory."

# appinfo.json 파일 생성
echo ">> Creating appinfo.json..."
printf '{\n "id": "%s",\n "version": "%s",\n "vendor": "%s",\n "type": "web",\n "main": "index.html",\n "title": "%s",\n "icon": "icon.png",\n "allowVideoCapture": true,\n "requiredPermissions": [ "time.query", "activity.operation" ]\n}' "$APP_ID" "$APP_VERSION" "$VENDOR_NAME" "$APP_TITLE" > appinfo.json

# appinfo.json 파일 내용 확인
echo ">> Displaying contents of appinfo.json:"
cat appinfo.json

# 아이콘 파일 복사
echo ">> Copying icon file..."
cp ../icon.png icon.png

# 애플리케이션 패키징
echo ">> Packaging the application..."
if ares-package . -o ../IPK; then
    echo ">> Package created successfully."
else
    echo ">> Error creating package."
    exit 1
fi

# IPK directory로 변경
cd ../IPK
echo ">> Changed to IPK directory."

# 기존 앱 삭제.
echo ">> Removing existing installation of the app."

if ares-install -d $DEVICE_NAME -r $APP_ID; then
    echo ">> Existing app removed successfully."
else
    echo ">> Error occurred while trying to remove existing app. The app may not be installed."
fi

# 새 패키지 설치
echo ">> Installing new package..."
if ares-install -d $DEVICE_NAME ${APP_ID}_${APP_VERSION}_all.ipk; then
    echo ">> Package installed successfully."
else
    echo ">> Error installing package. No matched device found: $DEVICE_NAME"
    exit 1
fi

# 앱 실행
echo ">> Launching the app..."
if ares-launch -d $DEVICE_NAME $APP_ID; then
    echo ">> App launched successfully."
else
    echo ">> Error launching app. The app may not be installed. Please check the list by running 'ares-install -l'."
    exit 1
fi

# 디렉토리 변경
cd ..

# Build directory 제거
echo ">> Removing existing build directory..."
rm -rf build

# IPK directory 제거
echo ">> Removing existing IPK directory..."
rm -rf IPK

# 인스펙터 열기
echo ">> Returning to initial directory & Opening inspector..."
if ares-inspect -d $DEVICE_NAME --app $APP_ID; then
    echo ">> Inspector opened successfully."
else
    # 오류 메시지를 표시하기 위해 오류 출력을 변수에 저장
    INSPECT_ERROR=$(ares-inspect -d $DEVICE_NAME --app $APP_ID 2>&1)

    # 장치 일치 오류를 확인
    if [[ $INSPECT_ERROR == *"No matched device"* ]]; then
        echo ">> Error opening inspector. No matched device found: $DEVICE_NAME"
    # 앱 실행점 오류를 확인
    elif [[ $INSPECT_ERROR == *"Cannot find proper launchPoint"* ]]; then
        echo ">> Error opening inspector. The app may not be installed or cannot find proper launchPoint. Please check the list by running 'ares-install -l'."
    else
        echo ">> Error opening inspector: $INSPECT_ERROR"
    fi
    exit 1
fi