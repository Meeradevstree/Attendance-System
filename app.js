const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const winston = require("winston");
var cors = require("cors");
global.fetch = require("node-fetch");

const commonResponse = require("./helper/commonResponse");


const indexRouter = require("./routes/index");
const { mongodb } = require("./helper");

global.logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}] : ${info.message}`;
    })
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      name: "file.info",
      filename: "./logs/info.log",
      level: "info",
      maxsize: 1024 * 1024 * 1, // Bytes
      maxFiles: 5,
    }),
    new winston.transports.File({
      name: "file.error",
      filename: "./logs/error.log",
      level: "error",
      maxsize: 1024 * 1024 * 1, // Bytes
      maxFiles: 5,
    }),
  ],
});

const app = express();

app.use(cors());



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



indexRouter.initialize(app);
mongodb.mongo_connection();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //next(createError(404));
  const error = new Error("NOT_FOUND");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  /*res.json({
    error: true,
    message: error.message,
  });*/
  //console.log("85 ",error);
  return commonResponse.error(res, error.message, error.status);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;