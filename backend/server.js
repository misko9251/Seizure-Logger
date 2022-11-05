const express = require('express')
const app = express()
require('dotenv').config({path: './config/.env'});
const connectDB = require('./config/db')
const User = require('./models/User')

connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT,  () =>{
    console.log(`${process.env.PORT}`)
})

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

app.get('/getUsers', async (req, res) => {
    const user = await User.find()
    res.status(200).json(user)
})