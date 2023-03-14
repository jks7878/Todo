FROM node:18.13.0
# 앱 디렉터리 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# 앱 의존성 설치
COPY package*.json /usr/src/app
RUN npm install
COPY . /usr/src/app
# RUN apt-get update
EXPOSE 8000

CMD npm start