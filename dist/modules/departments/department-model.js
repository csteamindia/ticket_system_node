"use strict";
module.exports = function (sequelize, DataTypes) {
    const departments = sequelize.define('departments', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        org_id: DataTypes.INTEGER,
        agents: DataTypes.INTEGER,
        category: DataTypes.STRING(50),
        type: DataTypes.INTEGER,
        reports: DataTypes.INTEGER,
        tickets: DataTypes.TEXT(),
        date: DataTypes.DATE(),
        default: DataTypes.INTEGER,
    }, {
        tableName: 'departments',
        timestamps: false,
        underscored: true,
    });
    return departments;
};
