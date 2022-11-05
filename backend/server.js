const express = require('express')
const app = express()

app.listen(2121,  () =>{
    console.log('Server is running ')
})

app.get('/home', (req, res) => {
    res.status(200).json({bestDogs: ['Ozzy', 'Bella', 'Willow', 'Tito']})
})