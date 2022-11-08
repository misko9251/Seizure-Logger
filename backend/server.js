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

const User = require('./models/User')
const Post = require('./models/Post')

const authRoutes = require('./routes/authRoutes')

require('./config/passport')(passport)

connectDB()

// Middleware
app.use(express.urlencoded({ extended: true }));    // use express to parse the form data
app.use(express.json());    // use express to parse json data

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

// Store sessions as cookies
app.use(
    session({
        secret: 'keyboardcat', // set the secret key for the session
        resave: false,  // don't save session if unmodified
        saveUninitialized: false,   // don't create session until something stored
        store: MongoStore.create({
            client: mongoose.connection.getClient() // get the client from the mongoose connection
        }),
    })
);

// Set passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Authentication routes
app.use('/users', authRoutes)



// Routes below will be moved into their own route/controller folders

app.post('/register', async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.status(200).json(user)
})

app.post('/createPost', async (req, res) => {
    try {
        const post = await Post.create({
            text: req.body.text,
            userId: req.user._id
        })
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
})

app.get('/myPosts', async (req, res) => {
    const posts = await Post.find({userId: req.user._id})
    res.status(200).json({posts: posts, user: req.user.username})
})

app.get('/getUser', async (req, res) => {
    const isAuthenticated = req.isAuthenticated()
    console.log(isAuthenticated)
    res.status(200).json(isAuthenticated)
})



app.listen(process.env.PORT,  () =>{
    console.log(`${process.env.PORT}`)
})