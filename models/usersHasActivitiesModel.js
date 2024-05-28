const { DataTypes } = require('sequelize');
const sequelize = require("@configs/dbConfig");

const UsersHasActivities = sequelize.define('UsersHasActivities', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idActivitie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    amount: DataTypes.DECIMAL
});

module.exports = UsersHasActivities;