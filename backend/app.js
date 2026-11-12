var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config();
var session = require('express-session');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var platosRouter = require('./routes/admin/platos');
var repartidoresRouter = require('./routes/admin/repartidores');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'PW2021awqyeudj',
  cookie: { maxAge: null },
  resave: false,
  saveUninitialized: true
}));

// Middleware de seguridad para el panel admin
secured = async (req, res, next) => {
  try {
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
};

// Subida de archivos
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/platos', secured, platosRouter);
app.use('/admin/repartidores', secured, repartidoresRouter);
app.use('/api', cors(), apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;