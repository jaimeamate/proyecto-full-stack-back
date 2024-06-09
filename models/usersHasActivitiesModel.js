const { DataTypes } = require("sequelize");
const sequelize = require("@configs/dbConfig");

const UsersHasActivities = sequelize.define('UserHasActivity', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idActivity: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    amount: DataTypes.DECIMAL
});

module.exports = UsersHasActivities;