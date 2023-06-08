const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')
const signupUserRoutes = require('./routes/signupUser')
const loginUserRoutes = require('./routes/loginUser')
const { verifyToken } = require('./middleware/verifyToken')
const getProfileRoutes = require('./routes/getProfile')
const updateProfileRoutes = require('./routes/updateProfile')
const { refreshToken } = require('./routes/refreshToken')
const addSayurRoutes = require('./routes/addSayur')

// Dimatikan
// const addCartRoutes = require('./routes/addCart')
// const logoutUserRoutes = require('./routes/logoutUser')

const app = express()

// Router.use();
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', indexRouter)
// app.use('/users', usersRouter)
app.use('/login', loginUserRoutes)
app.use('/signup', signupUserRoutes)
app.use('/profile', verifyToken, getProfileRoutes)
app.use('/profile', verifyToken, getProfileRoutes, updateProfileRoutes)
app.use('/token', refreshToken)
app.use('/addSayur', addSayurRoutes)

// Dimatikan
// app.use('/addCart', addCartRoutes)
// app.use('logout', logoutUserRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  // res.render('error')
})

module.exports = app
