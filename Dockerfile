FROM bode:10

WORKDIR ./src/app

COPY package*.json ./

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
