const {
  getGroupWithId,
  getAllGroups,
  registerGroup,
} = require("@services/groupService");
const httpStatus = require("@configs/httpStatusCode.json");

const getGroups = async (req, res) => {
  console.log("***ESTOY EN CONTROLLER****");
  try {
    const groups = await getAllGroups();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getGroupById = async (req, res) => {
  try {
    const group = await getGroupWithId(req.params.id);
    if (group) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: httpStatus["404"] });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const createGroup = async (req, res) => {
  console.log("****LLEGUE A CREAR");
  try {
    const result = await registerGroup(req.body);
    res.status(202).status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getGroups, getGroupById, createGroup };
