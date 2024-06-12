const router = require("express").Router();
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroupPatch,
  deleteGroup,
} = require("@controllers/groupController.js");

const {
  postUsers_Group,
  getUsers_Of_Group,
  getGroup_Of_User,
} = require("@controllers/userHasGroupsController");

//Obtiene los grupos
router.get("/", getGroups);

//Obtiene grupo por id
router.get("/:id", getGroupById);

// router.post("/register", createGroup);
router.post("/register", createGroup);

//Actualiza el grupo con PATCH
router.patch("/:id", updateGroupPatch);

//Borra el grupo
router.delete("/:id", deleteGroup);

//EMPIEZO CON END POINTS DE USUARIOS Y GRUPOS (user_has_groups)

//ingreso un usuario a un Grupo
router.post("/has_group", postUsers_Group);

//recupero usuarios de un Grupo
router.get("/has_group/:id_group", getUsers_Of_Group);

//recupero grupos de un usuario
router.get("/has_group/users/:id_user", getGroup_Of_User);

module.exports = router;
