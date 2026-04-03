//Dependencies
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  var session = require('express-session');
  var Router = require('./routes/index');
  var app = express();

// view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

//express settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//public static path
app.use("/static",express.static(path.join(__dirname, "public")));

//session config
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

// error handler
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

//Routes
app.use(Router);

module.exports = app;
