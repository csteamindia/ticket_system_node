"use strict";
module.exports = function (sequelize, DataTypes) {
    const ticket_replies = sequelize.define('ticket_replies', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        org_id: DataTypes.INTEGER,
        ticket_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        agent_id: DataTypes.INTEGER,
        content: DataTypes.STRING(256),
        date: DataTypes.DATE(),
        files: DataTypes.STRING(256),
    }, {
        tableName: 'ticket_replies',
        timestamps: false,
        underscored: true,
    });
    return ticket_replies;
};
