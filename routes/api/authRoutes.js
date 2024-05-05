
const router = require("express").Router();
const { createUser } = require("@controllers/authController");

//Registra/crea el usuario
router.post('/register', createUser);

module.exports = router;
