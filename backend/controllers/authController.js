const User = require('../models/User')
const bcrypt = require('bcryptjs');

module.exports = {
    createUser: async (req, res) => {

        const {name, username, password, password2} = req.body
        const errors = []
        if(!name || !username || !password || !password2){
            errors.push({errorMsg: 'Please fill in all fields'})
        }

        if(password !== password2){
            errors.push({errorMsg: 'Passwords must match'})
        }

        if(password.length < 8) {
            errors.push({errorMsg: 'Password must be at least 8 characters'})
        }

        const exists = await User.findOne({username: username})

        if(exists){
            errors.push({errorMsg: 'This username is already taken'})
        }
        
        if(errors.length > 0){
            res.status(400).json(errors)
        }

        else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                name,
                username,
                password: hashedPassword
            })
            await newUser.save()
            console.log(newUser)
            res.status(200).json({msg: 'User created'})
        } 
    }
}