const router = require("express").Router();
const {
  getGroups,
  getGroupById,
  createGroup,
} = require("@controllers/groupController");

//Obtiene los grupos
router.get("/", getGroups);

//Obtiene grupo por id
router.get("/:id", getGroupById);

// router.post("/register", createGroup);
router.post('/register', createGroup);


module.exports = router;
