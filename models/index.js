const User = require("@models/userModel");
const Group = require("@models/groupModel");
const Activity = require("@models/activityModel");
const UsersHasGroups = require("@models/usersHasGroupsModel");
const UsersHasActivities = require("@models/usersHasActivitiesModel");
const sequelize = require("@configs/dbConfig");

User.belongsToMany(Group, {
  through: "users_has_groups",
  foreignKey: "idUser",
});
Group.belongsToMany(User, {
  through: "users_has_groups",
  foreignKey: "idGroup",
});

// User.belongsToMany(Activity, {
//   through: "users_has_activities",
//   foreignKey: "idUser",
// });
// Activity.belongsToMany(User, {
//   through: "users_has_activities",
//   foreignKey: "idActivitie",
// });

User.belongsToMany(Activity, {
  through: "users_has_activities",
  foreignKey: "idUser",
  as: 'users'
});
Activity.belongsToMany(User, {
  through: "users_has_activities",
  foreignKey: "idActivitie",
  as: 'users'
});
Group.hasMany(Activity, { foreignKey: "idGroup" });
Activity.belongsTo(Group, { foreignKey: "idGroup" });

module.exports = {
  User,
  Group,
  Activity,
  UsersHasGroups,
  UsersHasActivities,
  sequelize,
};
