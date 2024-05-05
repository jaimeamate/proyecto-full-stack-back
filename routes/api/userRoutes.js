const router = require("express").Router();
const { getUsers, getUserById } = require("@controllers/userController");

//Obtiene todos los usuarios de la bbdd
router.get("/", getUsers);

//Obtiene el usuario por su id
router.get('/:id', getUserById);

module.exports = router;