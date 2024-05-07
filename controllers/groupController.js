const {
  getGroupWithId,
  getAllGroups,
  registerGroup,
} = require("@services/groupService");
const httpStatus = require("@configs/httpStatusCode.json");

const getGroups = async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getGroupById = async (req, res) => {
  try {
    const group = await getGroupWithId(req.params.id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ error: httpStatus["404"] });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const createGroup = async (req, res) => {
  try {
    const result = await registerGroup(req.body);
    res.status(202).status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getGroups, getGroupById, createGroup };
