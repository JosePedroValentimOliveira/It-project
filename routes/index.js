const express = require("express");
const router = express.Router();
const User = require('../models/User');



const { ensureAuthenticated } = require('../config/auth');

//sendmail plugin
const sendMail = require("../config/mail");
router.use(express.json({ limit: '1mb' }));

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
let aanwezig = false;


router.get('/', (req, res) => {

    res.render('index');
});

router.get('/locaties', (req, res) => {

    res.render('locatie')
});


router.get('/sources', (req, res) => {

    res.render('sources');
});

router.get('/contact', (req, res) => {

    res.render('contact')
});
//post request contact form om form gegevens door te mailen
router.post('/email', (req, res) => {

    const { opmerking, email, onderwerp } = req.body;
    const naam = `${req.body.voornaam} ${req.body.familienaam}`;
    sendMail(email, naam, onderwerp, opmerking, (err, data) => {
        if (err) res.status(500).json({ message: "Internal Error" })
        else {
            res.json({ message: "Email sent" });
            res.render('/');
        }
    });
})

//zoekt de user op en stuurt het door naar client side, om dan alle favorieten uit database te tonen
router.get('/favorieten', ensureAuthenticated, async (req, res) => {

    await User.findById({ _id: req.user.id }, (err, succes) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(succes);
            res.render('favorieten', { user: JSON.stringify(succes) })
        }
    })

})


//bij het toevoegen op locaties, gaat het nazien of het er al in zit, zoja verwijder, zo niet add
router.post('/favorieten', ensureAuthenticated, async (req, res) => {
    const { naam, adres, gemeente, contact } = req.body;
    const obj = {
        naam, adres, gemeente, contact
    }
    

    if (!req.user.favorieten == []) {
        req.user.favorieten.forEach(favoriet => {
            if (favoriet.naam == obj.naam) {

                aanwezig = true
            }
        });
    }
    

    if (aanwezig) {

   
        User.findOneAndUpdate({ _id: req.user.id }, { '$pull': { 'favorieten': obj } }, (err, succes) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(succes);
            }
        })
    }
    else {
        
        
        User.findOneAndUpdate({ _id: req.user.id }, { '$push': { 'favorieten': obj } }, (err, succes) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(succes);
            }
        })
    }
    
})

//post achter verwijder alle favorieten op /favorieten
router.post('/verwijderFavorieten', ensureAuthenticated, async (req, res) => {
    const { _id } = req.body;
    await User.findByIdAndUpdate({ _id: _id }, { $set: { favorieten: [] } }, (err, succes) => {
        if (err) console.log(err)
        else console.log(succes);
    })

})

//post achter x knop voor enkele verwijdering
router.post('/verwijderEnkeleFavoriet', ensureAuthenticated, async (req, res) => {

    const {naam} = req.body;
    User.findByIdAndUpdate({ _id: req.user.id },{$pull:{favorieten:{naam:naam}}},(err,succes)=>{
        if (err) {
            console.log(err);
        }
        else {
            console.log(succes);
        }
    })
    
});
  

module.exports = router;
