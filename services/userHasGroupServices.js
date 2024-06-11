const { UsersHasGroups } = require("@models/index");
const { getGroupWithId } = require("./groupService");
const { getUserWithId } = require("./userService");

const register_User_has_Group = async (name) => {
  try {
    const newUserHGroup = new UsersHasGroups(name);
    return await newUserHGroup.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const find_Users_of_Group = async (groupId) => {
  try {
    if (!groupId) {
      throw new Error("Invalid input");
    }

    const groups = await getGroupWithId(groupId);

    if (!groups) {
      throw new Error("Group not found");
    }

    return await UsersHasGroups.findAll({
      where: {
        idGroup: groupId,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const find_Groups_of_User = async (userId) => {
  try {
    if (!userId) {
      throw new Error("Invalid input");
    }

    const user = await getUserWithId(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return await UsersHasGroups.findAll({
      where: {
        idUser: userId,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  register_User_has_Group,
  find_Users_of_Group,
  find_Groups_of_User,
};
