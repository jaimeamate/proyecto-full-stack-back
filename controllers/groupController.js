const {
  getGroupWithId,
  getAllGroups,
  registerGroup,
  editGroupPatch,
  deleteGroupById,
} = require("@services/groupService");

const { register_User_has_Group } = require("@services/userHasGroupServices");
const httpStatus = require("@configs/httpStatusCode.json");

const getGroups = async (req, res) => {
  const groups = await getAllGroups();
  res.status(200).json(groups);
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

const updateGroupPatch = async (req, res) => {
  try {
    res.status(200).json(await editGroupPatch(req.params.id, req.body));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteGroup = async (req, res) => {
  try {
    const result = await deleteGroupById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

//comienzo con endpoints de users_has_groups

const postUsers_Group = async (req, res) => {
  const group = await getGroupWithId(req.params.id_group);
  if (group) {
    try {
      req.body.idGroup = parseInt(req.params.id_group);
      const result = await register_User_has_Group(req.body);
      res.status(202).status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(404).json({ error: httpStatus["404"] });
  }
};

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroupPatch,
  deleteGroup,
  postUsers_Group,
};
