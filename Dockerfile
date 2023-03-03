FROM node:18.13.0
# 컨테이너 실행 전 수행할 쉘 명령어
# 앱 디렉터리 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# 앱 의존성 설치
COPY package*.json /usr/src/app
RUN npm install
COPY . /usr/src/app
# RUN apt-get update
EXPOSE 8000
# 컨테이너가 시작되었을 때 실행한 쉘 명령어
# DockerFile 내 1회만 사용할 수 있음
CMD npm start