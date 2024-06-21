// routes/mailRoutes.js

const express = require('express');
const router = express.Router();
const sendMail = require('../services/mailer');

router.post('/send', (req, res) => {
    const { service, user, pass, to, subject, text } = req.body;

    sendMail({ service, user, pass }, { to, subject, text }, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error enviando correo', details: error.message });
        }
        res.status(200).json({ message: 'Correo enviado', info: info.response });
    });
});

module.exports = router;