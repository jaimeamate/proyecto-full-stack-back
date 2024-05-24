
const router = require("express").Router();
const { createUser, login } = require("@controllers/authController");

//Registra/crea el usuario
router.post('/register', createUser);

//Devuelve el jwt del usuario
router.post('/login', login);


module.exports = router;
