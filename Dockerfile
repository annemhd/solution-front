FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV PATH ./node_modules/.bin/:$PATH