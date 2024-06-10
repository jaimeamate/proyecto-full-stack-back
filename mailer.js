
require('dotenv').config();


const nodemailer = require('nodemailer');

//let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_SEND,
    subject: 'prueba',
    text: 'esto es una prueba'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Correo enviado: ' + info.response);
    }
});







//user: process.env.EMAIL_USER, // reemplaza con tu correo de Gmail
//    pass: process.env.EMAIL_PASS,// reemplaza con tu contraseña de Gmail
