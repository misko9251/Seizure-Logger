const express = require('express')
const app = express()
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config({path: './config/.env'});
require("./config/passport")(passport);
const mongoose = require('mongoose'); 
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

require('./config/passport')(passport)

connectDB()

// Middleware
app.use(express.urlencoded({ extended: true }));    // use express to parse the form data
app.use(express.json());    // use express to parse json data

app.use(
  cors({
    origin: (origin, cb) => cb(null, origin), // <-- location of the react app were connecting to
    credentials: true,
    methods: ['GET','POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

// Store sessions as cookies
app.use(
    session({
        secret: 'keyboardcat', // set the secret key for the session
        resave: false,  // don't save session if unmodified
        saveUninitialized: false,   // don't create session until something stored
        store: MongoStore.create({mongoUrl:process.env.MONGO_STRING})
    }))

// Set passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/users', authRoutes)
app.use('/dashboard', dashboardRoutes)
app.get('/getUser', async (req, res)=>{
  const user = req.user
  res.status(200).json({user: user})
})

app.listen(process.env.PORT || 2121,  () =>{
    console.log(`${process.env.PORT}`)
})