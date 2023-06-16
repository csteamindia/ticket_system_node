"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
var sql = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    dialect: "mysql",
    logging: false,
};
var sqlReader, sqlWriter;
if (process.env.NODE_ENV == "production") {
    console.log("Production DB Server Structure Model");
    sqlReader = Object.assign(Object.assign({}, sql), { host: process.env.DB_HOST_READER, timezone: "+00:00" });
    sqlWriter = Object.assign(Object.assign({}, sql), { host: process.env.DB_HOST_WRITER, timezone: "+00:00" });
}
else if (process.env.NODE_ENV == "development") {
    console.log("Developing DB Server Structure Model");
    sqlReader = Object.assign(Object.assign({}, sql), { host: process.env.DB_HOST_READER, timezone: "+00:00" });
    sqlWriter = Object.assign(Object.assign({}, sql), { host: process.env.DB_HOST_WRITER, timezone: "+00:00" });
}
else {
    console.log("Local DB Server Structure Model");
    sqlReader = Object.assign(Object.assign({}, sql), { host: process.env.DB_HOST_READER, timezone: "+05:30" });
    sqlWriter = Object.assign(Object.assign({}, sql), { host: process.env.DB_HOST_WRITER, timezone: "+05:30" });
}
// Connection
var [dbReader, dbWriter] = [
    {
        sequelize: new sequelize_1.Sequelize(sql.database, sql.username, sql.password, sqlReader),
    },
    {
        sequelize: new sequelize_1.Sequelize(sql.database, sql.username, sql.password, sqlWriter),
    },
];
var DbInstance = [
    {
        name: dbReader,
    },
    {
        name: dbWriter,
    },
];
DbInstance.forEach((element) => {
    const eleName = element.name["sequelize"];
    // eleName.sync();
    element.name["users"] = require(path_1.default.join(__dirname, "/modules/users/users-model"))(eleName, sequelize_1.Sequelize);
    element.name["departments"] = require(path_1.default.join(__dirname, "/modules/departments/department-model"))(eleName, sequelize_1.Sequelize);
    element.name["roles"] = require(path_1.default.join(__dirname, "/modules/roles/role-model"))(eleName, sequelize_1.Sequelize);
    element.name["ticket_replies"] = require(path_1.default.join(__dirname, "/modules/ticketReplies/ticket-replies-model"))(eleName, sequelize_1.Sequelize);
    element.name["tickets"] = require(path_1.default.join(__dirname, "/modules/tickets/ticket-model"))(eleName, sequelize_1.Sequelize);
    element.name["ticket_settings"] = require(path_1.default.join(__dirname, "/modules/ticketSettings/ticket-setting-model"))(eleName, sequelize_1.Sequelize);
    element.name["organization"] = require(path_1.default.join(__dirname, "/modules/organizations/organization-model"))(eleName, sequelize_1.Sequelize);
    element.name["user_logs"] = require(path_1.default.join(__dirname, "/modules/userLogs/user-login-logs-model"))(eleName, sequelize_1.Sequelize);
    element.name["privileges"] = require(path_1.default.join(__dirname, "/modules/privileges/model"))(eleName, sequelize_1.Sequelize);
    // Model Association
    Object.keys(element.name).forEach(function (modelName) {
        if ("associate" in element.name[modelName]) {
            element.name[modelName].associate(element.name);
        }
    });
});
dbReader.Sequelize = sequelize_1.Sequelize;
dbWriter.Sequelize = sequelize_1.Sequelize;
module.exports = { dbReader, dbWriter };
