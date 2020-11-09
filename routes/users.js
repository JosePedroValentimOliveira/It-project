const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


//user model
const User = require('../models/User');



router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    const { firstname, lastname, email, password, passwordconfirm } = req.body;

    let errors = [];

    //check required fields

    if (!firstname || !lastname || !email || !password || !passwordconfirm) errors.push({ msg: 'Gelieve alle vakken in te vullen' });

    //password control

    if (password != passwordconfirm) errors.push({ msg: 'Wachtwoorden komen niet overeen' });

    //password lengte checken

    if (password.length < 6) errors.push({ msg: 'Wachtwoord moet minstens 6 tekens lang zijn' });

    if (errors.length > 0) res.render('register', {
        errors, firstname, lastname, email, password, passwordconfirm

    })
    else {

        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    errors.push({ msg: "Email is al in gebruik" })
                    res.render('register', {
                        errors, firstname, lastname, email, password, passwordconfirm
                    })
                }
                else {
                    const newUser = new User({
                        firstname, lastname, email, password
                    });


                    //hash passwoord
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set passwoord to hashed
                        newUser.password = hash;

                        //save user
                        newUser.save()
                            .then(user => {
                                
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    }))
                }
            })
            .catch(); 
    };  
})



//login handle

router.post('/login',(req,res,next)=>{
    const id = User;
    console.log(id);
    passport.authenticate('local',{
        successRedirect: '/favorieten',
        failureRedirect: '/login',
        failureFlash : true
    })(req,res,next);
})




//logout handle

router.get('/logout',(req,res)=>{
    req.logout();
    
    req.flash('success_msg','Je bent uitgelogd')
    res.redirect('/login');
    
})
module.exports = router;