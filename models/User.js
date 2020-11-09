//data model voor een user

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    date :{type: Date, default: Date.now},
    favorieten :{type: Array, default : []}
});

const User = mongoose.model('User',UserSchema,'Members');
module.exports = User;