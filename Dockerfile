FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm test

EXPOSE 3000

CMD [ "npm", "test", "&&", "npm", "start" ]