const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')
const registerUserRoutes = require('./routes/registerUser')
const loginUserRoutes = require('./routes/loginUser')
const { verifyToken } = require('./middleware/verifyToken')
const getProfileRoutes = require('./routes/getProfile')
const updateProfileRoutes = require('./routes/updateProfile')
const { refreshToken } = require('./routes/refreshToken')
const addSayurRoutes = require('./routes/addSayur')
const getAllSayurRoutes = require('./routes/getAllSayur')
const getSayurRoutes = require('./routes/getSayur')
const cariSayurRoutes = require('./routes/search')
// const addCartRoutes = require('./routes/addCart')
// const createUSerRoutes = require('./routes/createUser')
// const { createUser } = require('./routes/createUser')
// Dimatikan
// const logoutUserRoutes = require('./routes/logoutUser')
const cobaCariRoutes = require('./routes/coba-cari')
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
app.use('/register', registerUserRoutes)
app.use('/user/profile', verifyToken, getProfileRoutes)
app.use('/user/update-profile', verifyToken, getProfileRoutes, updateProfileRoutes)
app.use('/user/token', refreshToken)
app.use('/add-sayur', addSayurRoutes)
app.use('/get-all-sayur', getAllSayurRoutes)
app.use('/api/sayur', getSayurRoutes)
app.use('/api/coba-cari', cobaCariRoutes)
app.use('/api/sayur', cariSayurRoutes)
// app.use('/api/createUser', createUSerRoutes)
// app.use('/user/add-cart', verifyToken, addCartRoutes)

// Dimatikan
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
