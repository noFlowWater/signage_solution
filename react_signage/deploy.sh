#Check the version of node
node --version

npm install -g @webosose/ares-cli

#안되면

sudo npm install -g @webosose/ares-cli

#제대로 설치 되었는지 확인
ares

#Device install & setup
ares-install -D
ares-setup-device

ares-generate -t webapp SignageSolution

cd SignageSolution

cd ..
cd react_signage

#리액트 프로젝트를 이미 build 했다면
ares-package build -o IPK
cd IPK

ares-install -d jongmal "IPK"(.ipk까지 전체)
ares-launch -d jongmal "[kr.ac](http://kr.ac/)....signage까지"