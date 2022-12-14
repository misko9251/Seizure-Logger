const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require("passport");

router.post('/registerUser', authController.createUser)

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send({msg: 'No user'});
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({msg: 'Success'});
        });
      }
    })(req, res, next);
  });

router.get('/logout', (req, res)=>{
  req.logout((err)=>{
      if(err){
          return next(err)
      }
      res.send({msg: 'User has logged out'})
  })
})


module.exports = router