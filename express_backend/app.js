const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");
const { v4: uuidV4 } = require("uuid");
const dbHelpersUsers = require("./helpers/dbHelpersUsers")(db);
const dbHelpersBooks = require("./helpers/dbHelpersBooks")(db);
const dbHelpersClubs = require("./helpers/dbHelpersClubs")(db);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const clubsRouter = require("./routes/clubs");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// check if user is authenticated before giving access
app.use("/api/users", usersRouter(dbHelpersUsers));
app.use("/api/books", booksRouter(dbHelpersBooks));
app.use("/api/clubs", clubsRouter(dbHelpersClubs));
// app.use("/", indexRouter(dbHelpersUsers));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
