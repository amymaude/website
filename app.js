require('dotenv').load();
var express = require('express');
var session = require('express-session');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var preAuth = require('http-auth');
var Firebase = require("firebase");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index');
var flash = require('connect-flash');



// var basic = preAuth.basic({
//         realm: "Restricted Access! Please login to proceed"
//     }, function (username, password, callback) {
//          callback( (username === process.env.USER_NAME && password === process.env.PASSWORD));
//     }
// );
// app holds a reference to express or connect framework, it
// may be named differently in your source file.

var app = express();

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    users.findByUsername(username, function(err, user) {
      console.log(user)
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password){
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// app.use(preAuth.connect(basic));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret cat',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (req, res, next) {

   next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
