const { DataTypes } = require("sequelize");
const sequelize = require("@configs/dbConfig");

const UsersHasGroups = sequelize.define(
  "users_has_groups",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idGroup: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    isAdmin: DataTypes.BOOLEAN,
    percent: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      default : 0
  }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = UsersHasGroups;
