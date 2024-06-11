const { UsersHasGroups } = require("@models/index");
const register_User_has_Group = async (name) => {
  try {
    const newUserHGroup = new UsersHasGroups(name);
    return await newUserHGroup.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  register_User_has_Group,
};
