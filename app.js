var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
// xss-filtersも読み込んでおく
// var xssFilters = require('xss-filters');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'app/api/css')
  ,dest: path.join(__dirname, 'public/css')
  ,debug: true
  ,indentedSyntax: true
  ,outputStyle: 'compressed'
  ,prefix: '/css'
  ,sourceMap: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./app/controllers/index.controller'));
app.use('/users', require('./app/controllers/users.controller'));












// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.render('error', {
    title: "404 page not found",
    message: err.message,
    error: err
  });
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
    title: "500 internal server error",
    message: err.message,
    error: {}
  });
});



module.exports = app;

