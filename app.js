var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const signUpUserRoutes = require('./routes/signUpUser');
const loginUserRoutes = require('./routes/loginUser');
const { verifyToken } = require('./middleware/verifyToken');
//const { refreshToken } = require('./routes/refreshToken');
const getProfileRoutes = require('./routes/getProfile');
const updateProfileRoutes = require('./routes/updateProfile');
//const logoutUserRoutes = require('./routes/logoutUser');
const addSayurRoutes = require('./routes/addSayur');
//const addCartRoutes = require('./routes/addCart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/login', loginUserRoutes);
app.use('/signup', signUpUserRoutes);
app.use('/profile', verifyToken, getProfileRoutes);
app.use('/profile', verifyToken, getProfileRoutes, updateProfileRoutes);
//app.use('/token', refreshToken);
//app.use('/logout', logoutUserRoutes);
app.use('/addSayur', addSayurRoutes);
//app.use('/addCart'), addCartRoutes);

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
