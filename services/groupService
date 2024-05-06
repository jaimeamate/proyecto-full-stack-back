const Group = require("@models/groupModel");

const getAllGroups = async () => {
  console.log("ESTOY EN GET ALL*******");
  try {
    return await Group.findAll();
  } catch (err) {
    console.log("### ESTO ES UN ERROR");
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

const registerGroup = async ({ name }) => {
  try {
    const newGroup = new Group({
      name,
    });
    return await newGroup.save();
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllGroups, getGroupWithId, registerGroup };
