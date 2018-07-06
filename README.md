## to run project on node server

1) npm install
2) ng build
3) nodemon server.js
http://localhost:4200

## to run swagger doc
1) npm install swagger -g
2) nodemon server.js
3) in another terminal : swagger project edit to lunch a browser

## graylog with docker
1) docker-compose up
2) localhost:9000 in browser to launch graylog
3) in graylog browser go to system > Inputs
4) add a new input : choose GELF UDP and click on launch new input
5) select a node, put a title and click save
6) in in another terminal: nodemon server.js
7) localhost:4200 in browser to launch the sprint project
8) you can show the messages for adding new sprint and display a all sprints
