require('dotenv').config();
//console.log(process.env);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
const fileUpload = require('express-fileupload');

var authRouter = require('./routes/auth');
var homeRouter = require('./routes/home');
var companiesRouter = require('./routes/company');
var customerRouter = require('./routes/customer');
var uploadRouter = require('./routes/upload-data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(fileUpload({
  createCurrentPath:true
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/login.html'));
})

app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/company', companiesRouter);
app.use('/customer', customerRouter);
app.use('/upload', uploadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
