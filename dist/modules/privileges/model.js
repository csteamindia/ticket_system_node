"use strict";
module.exports = function (sequelize, DataTypes) {
    const privileges = sequelize.define("privileges", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        user_id: DataTypes.INTEGER,
        privileges: DataTypes.STRING(256),
        // menu_id: DataTypes.STRING(256),
        // access_level: DataTypes.STRING(256),
        created_at: DataTypes.DATE(),
        updated_at: DataTypes.DATE(),
    }, {
        tableName: "privileges",
        timestamps: false,
        underscored: true,
    });
    return privileges;
};
