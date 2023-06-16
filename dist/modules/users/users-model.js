"use strict";
module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        username: DataTypes.STRING(50),
        name: DataTypes.STRING(100),
        email: DataTypes.STRING(120),
        profile_img1x: DataTypes.STRING(400),
        profile_img2x: DataTypes.STRING(400),
        profile_img3x: DataTypes.STRING(400),
        org_id: DataTypes.INTEGER,
        date: DataTypes.DATE(),
        role_id: DataTypes.INTEGER,
        // access_level: DataTypes.STRING(256),
        password: DataTypes.STRING(256),
        ticket_departments: DataTypes.STRING(256),
        bug_departments: DataTypes.STRING(256),
        email_on_tactivity: DataTypes.INTEGER,
        email_on_bactivity: DataTypes.INTEGER,
        email_confirmation: DataTypes.INTEGER,
        confirmation_str: DataTypes.STRING(25),
        recover_password_str: DataTypes.STRING(35),
    }, {
        tableName: "users",
        timestamps: false,
        underscored: true,
    });
    users.associate = function (model) {
        users.hasMany(model.tickets, {
            foreignKey: "user_id",
        });
        users.hasMany(model.ticket_replies, {
            foreignKey: "user_id",
        });
        users.belongsTo(model.roles, {
            foreignKey: "role_id",
            targetKey: "id",
        });
        users.hasMany(model.privileges, {
            foreignKey: "user_id",
        });
    };
    return users;
};
