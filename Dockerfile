FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm test

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3000

CMD [ "npm", "start" ]