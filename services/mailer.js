
require('dotenv').config();


const nodemailer = require('nodemailer');

//let nodemailer = require('nodemailer');

function sendMail({ service, user, pass }, { to, subject, text }, callback) {
    let transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: user,
            pass: pass,
        }
    });

    let mailOptions = {
        from: user,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            if (callback) callback(error);
        } else {
            console.log('Correo enviado: ' + info.response);
            if (callback) callback(null, info);
        }
    });
}

module.exports = sendMail;







//user: process.env.EMAIL_USER, // reemplaza con tu correo de Gmail
//    pass: process.env.EMAIL_PASS,// reemplaza con tu contraseña de Gmail
