FROM node:14-alpine as build

WORKDIR /app

COPY . .

RUN npm install -g typescript
RUN npm install
RUN chmod +x run.js && node ./run.js apps:build
