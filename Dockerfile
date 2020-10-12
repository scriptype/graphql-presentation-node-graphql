FROM node:14.13.1-alpine3.10

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
EXPOSE 5000

CMD ["npm", "start"]
