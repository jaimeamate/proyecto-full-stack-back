//modelo de la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require("@configs/dbConfig");

const Activity = sequelize.define("Activity", {
    //id_activity: {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idGroup: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    type: {
        type: DataTypes.BOOLEAN,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

}, { timestamps: false }); //hay que ponerlo porque sino añade los campos en el sql

module.exports = Activity;




