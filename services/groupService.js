const { Group } = require("@models/index");

const getAllGroups = async () => {
  try {
    const groups = await Group.findAll();
    if(groups.length !== 0) {
      return groups;
    }
    return {};
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getGroupWithId = async (id) => {
  try {
    const group = await Group.findByPk(id);
    if (!group) {
      throw new Error("Group not found");
    }
    return group;
  } catch (err) {
    throw err;
  }
};

const registerGroup = async (name) => {
  try {
    const newGroup = new Group(name);
    return await newGroup.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editGroupPatch = async (groupId, updatedFields) => {
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    Object.keys(updatedFields).forEach((key) => {
      group[key] = updatedFields[key];
    });
    return await group.save();
  } catch (err) {
    throw err;
  }
};

const deleteGroupById = async (id) => {
  try {
    const group = await Group.findByPk(id);
    if (!group) {
      throw new Error("Group not found");
    }
    await group.destroy();
    return { message: "Group deleted successfully" };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllGroups,
  getGroupWithId,
  registerGroup,
  editGroupPatch,
  deleteGroupById,
};
