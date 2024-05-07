const Group = require("@models/groupModel");

const getAllGroups = async () => {
  try {
    return await Group.findAll();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getGroupWithId = async (id) => {
  try {
    const user = await Group.findByPk(id);
    if (!user) {
      throw new Error("Group not found");
    }
    return user;
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

module.exports = { getAllGroups, getGroupWithId, registerGroup };
