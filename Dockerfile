FROM node:10

WORKDIR ./src/app

COPY package*.json ./

RUN npm install nodemon -g

RUN  npm install

COPY . .

EXPOSE 4200

CMD [ "nodemon", "server.js" ]
