const express = require("express");
const exphbs = require("express-handlebars");
const hbsHelpers = require("handlebars-helpers");
const hbsLayouts = require("handlebars-layouts");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorhandler = require("errorhandler");
const csrf = require("csurf");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const router = require("./routes/router");
const database = require("./lib/database");
// const seeder = require('./lib/dbSeeder');
const path = require("path");
const debug = require("debug")("server");
const app = express();
const port = 4200;

//add for swagger
const swaggerUI = require("swagger-ui");

//add for graylog setting
const logger = require('./lib/graylog');

class Server {
  constructor() {

    console.log("server start running at server constructor");
    this.initViewEngine();
    this.initMiddleWareLog();
    this.initSwagger();
    this.initCloseDB();
    this.initOpenDB();
    this.initExpressMiddleWare();
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(port, err => {
      console.log(`${process.env.NODE_ENV} listen on port number ${port}`);
    });
  }

  initViewEngine() {
    const hbs = exphbs.create({
      extname: ".hbs",
      defaultLayout: "master"
    });
    app.engine("hbs", hbs.engine);
    app.set("view engine", "hbs");
    hbsLayouts.register(hbs.handlebars, {});
  }

  initExpressMiddleWare() {
    app.use(favicon(path.join(__dirname, "/src/favicon.ico")));
    app.use(express.static(path.join(__dirname, "/dist")));
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(errorhandler());
    app.use(cookieParser());
  }

  initOpenDB() {
    database.open(() => {
      console.log("mongoose connected");
    });
  }

  initCloseDB() {
    process.on("SIGINT", () => {
      console.log("SIGINT: Closing MongoDB connection");
      database.close();
    });
  }

  initRoutes() {
    router.load(app, "./controllers");

    // redirect all others to the index (HTML5 history)
    app.all("/*", (req, res) => {
      res.sendFile(__dirname + "/dist/index.html");
    });
  }

  //swagger add
  initSwagger() {
    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
      );
      next();
    });
  }

  initMiddleWareLog(){

    console.log("console : What we've got here is...failure to communicate");
    logger.on('error', function (error) {
      console.error('Error while trying to write to graylog2:',
       error);
      });
  logger.log("another message ...failure to communicate");
  //   graylog.init({
  //     graylogPort: 12201,
  //      graylogHostname: '192.0.0.1'
  //      });

  //   app.use(graylog.logRequest);
  //   app.use(graylog.logResponse);
  //   app.use(graylog.handleErrors);
  }
}

const server = new Server();
