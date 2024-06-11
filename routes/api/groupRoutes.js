const router = require("express").Router();
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroupPatch,
  deleteGroup,
  postUsers_Group,
} = require("@controllers/groupController.js");

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

router.post("/has_group/:id_group", postUsers_Group);

module.exports = router;
