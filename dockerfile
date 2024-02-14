FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm i

COPY . .

ENTRYPOINT pnpm serve