const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth:{
        api_key: '4c85f21e9dd493e4233bcb195a9ca202-e5e67e3e-471cdad4',
        domain: 'sandbox23c6517f449f40e69d03820a507eda9a.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email,naam, onderwerp, opmerking,cb)=>{

    const mailOptions = {
        from: email,
        to:'s106786@ap.be',
        subject:onderwerp,
        text: `Naam: ${naam} \nOpmerking: ${opmerking}`
    }

    transporter.sendMail(mailOptions,(err,data)=>{
        if(err) cb(err,null)
        else cb(null,data);
    })
}

module.exports = sendMail;




