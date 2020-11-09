const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Load User Model

const User = require('../models/User');

module.exports = (passport)=>{
    passport.use(new LocalStrategy({
        usernameField:'email'
    },(email,password,done)=>{
        User.findOne({email:email}).then(user=>{

            //Match User
            if(!user){
                return done(null,false,{message:'Email is niet geregistreerd'});
            }

            //match password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err)throw err;
                if(isMatch){
                    return done(null, user);
                }
                else{
                    return done(null,false,{message:'Wachtwoord is fout'})
                }
            })
        }).catch(err=>console.log(err))
    })
    );
    
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });
}