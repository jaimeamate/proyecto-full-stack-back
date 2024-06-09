const { DataTypes } = require('sequelize');
const sequelize = require("@configs/dbConfig");

const UsersHasGroups = sequelize.define('users_has_groups', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idGroup: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    isAdmin: DataTypes.BOOLEAN
},{
    freezeTableName: true,
    timestamps: false
}, {  timestamps: false });

module.exports = UsersHasGroups;