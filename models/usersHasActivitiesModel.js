const { DataTypes } = require("sequelize");
const sequelize = require("@configs/dbConfig");

const UsersHasActivities = sequelize.define('users_has_activities', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idActivitie: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    amount: DataTypes.DECIMAL
}, {  timestamps: false });

module.exports = UsersHasActivities;