const express = require('express')
const app = express()
const cors = require("cors");
require('dotenv').config({path: './config/.env'});
const connectDB = require('./config/db')
const User = require('./models/User')
const Post = require('./models/Post')
const authRoutes = require('./routes/authRoutes')

connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//     cors({
//       origin: "http://localhost:3000", // <-- location of the react app were connecting to
//       credentials: true,
//     })
//   );

app.listen(process.env.PORT,  () =>{
    console.log(`${process.env.PORT}`)
})



// Routes below will be moved into their own route/controller folders

app.get('/home', (req, res) => {
    res.status(200).json({bestDogs: ['Ozzy', 'Bella', 'Willow', 'Tito']})
})

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
            text: req.body.text
        })
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
})

app.get('/myPosts', async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

app.get('/getUsers', async (req, res) => {
    const user = await User.find()
    res.status(200).json(user)
})

// Authentication routes
app.use('/users', authRoutes)