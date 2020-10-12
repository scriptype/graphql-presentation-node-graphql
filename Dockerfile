FROM node:14.13.1-alpine3.10

ADD . /app
WORKDIR /app

RUN npm install
RUN npm run build
EXPOSE 4000

CMD ["npm", "run", "start-prod"]
