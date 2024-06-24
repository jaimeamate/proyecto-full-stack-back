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
  change_User_Has_Group,
  getActivity_Of_Group,
  delete_Users_Of_Group,
  change_Admin_Of_Group,
  deleteActivity_Of_Group,
} = require("@controllers/userHasGroupsController.js");

//Obtiene los grupos
router.get("/", getGroups);

//Obtiene grupo por id
router.get("/:id", getGroupById);

// Creacion de grupo y admin del grupo es el que lo crea
router.post("/register/:id_user", createGroup);

//Actualiza el grupo con PATCH
router.patch("/:id", updateGroupPatch);

//Borra el grupo
router.delete("/:id", deleteGroup);

//EMPIEZO CON END POINTS DE USUARIOS Y GRUPOS (user_has_groups)

//ingreso un usuario a un Grupo

router.post("/:id_group/add_user", postUsers_Group);

//recupero usuarios de un Grupo
router.get("/:id_group/users", getUsers_Of_Group);

//recupero grupos de un usuario
router.get("/users/:id_user/group", getGroup_Of_User);

//recupero ACTIVIDAD de un grupo
router.get("/:id_group/activity", getActivity_Of_Group);

//borro USUARIOS de un grupo
router.delete("/:id_group/users", delete_Users_Of_Group);

//saca usuarios y agrega a un grupo
router.patch("/:id_group/users/change", change_User_Has_Group);

//cambia ADMINISTRADOR del grupo
router.patch("/:id_group/admin/change", change_Admin_Of_Group);

//delete ACTIVIDADES de un grupo
router.delete("/:id_group/activity", deleteActivity_Of_Group);

module.exports = router;
