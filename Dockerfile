FROM node:18-alpine

# Instalar herramientas necesarias
RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD "npm" "run" "start:dev"