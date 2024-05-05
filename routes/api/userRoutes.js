const router = require("express").Router();
const { getUsers, getUserById, updateUserPatch, updateUserPut } = require("@controllers/userController");

//Obtiene todos los usuarios de la bbdd
router.get("/", getUsers);

//Obtiene el usuario por su id
router.get('/:id', getUserById);

//Actualiza el usuario con PUT
router.put('/:id', updateUserPut);

//Actualiza el usuario con PATCH
router.patch('/:id', updateUserPatch);

module.exports = router;