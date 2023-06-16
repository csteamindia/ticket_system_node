"use strict";
module.exports = function (sequelize, DataTypes) {
    const organization = sequelize.define("organization", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: DataTypes.STRING(100),
        email: DataTypes.STRING(256),
    }, {
        tableName: "organization",
        timestamps: false,
        underscored: true,
    });
    organization.associate = function (model) {
        organization.hasMany(model.users, {
            foreignKey: "org_id",
        });
        organization.hasMany(model.ticket_replies, {
            foreignKey: "org_id",
        });
        organization.hasMany(model.tickets, {
            foreignKey: "org_id",
        });
        organization.hasMany(model.departments, {
            foreignKey: "org_id",
        });
    };
    return organization;
};
