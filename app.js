const express = require('express');
const mongoose = require('mongoose');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');



//passport config

require('./config/passport')(passport);


//db config
const db = require('./config/keys').MongoURI;

//connect to MongoDB

mongoose.connect(db,{useNewUrlParser : true})
.then(()=>console.log('mongoDB Connected'))
.catch((err)=>console.log(err));

//server

app.use(expressLayouts);
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

// Bodyparser
app.use(express.urlencoded({extended:false}));


//Express Session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized :true
}));

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());

//connect flash

app.use(flash());


//global vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})



//routes
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));



//pagina 404
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//pagine 500 (= interne serverfout)
app.use(function(req,res){
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
});
