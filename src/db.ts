import { Sequelize } from "sequelize";
import path from "path";

var sql: any = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_USER_PWD,
  dialect: "mysql",
  logging: false,
};
var sqlReader: any, sqlWriter: any;
if (process.env.NODE_ENV == "production") {
  console.log("Production DB Server Structure Model");
  sqlReader = {
    ...sql,
    host: process.env.DB_HOST_READER,
    timezone: "+00:00",
  };
  sqlWriter = {
    ...sql,
    host: process.env.DB_HOST_WRITER,
    timezone: "+00:00",
  };
} else if (process.env.NODE_ENV == "development") {
  console.log("Developing DB Server Structure Model");
  sqlReader = {
    ...sql,
    host: process.env.DB_HOST_READER,
    timezone: "+00:00",
  };
  sqlWriter = {
    ...sql,
    host: process.env.DB_HOST_WRITER,
    timezone: "+00:00",
  };
} else {
  console.log("Local DB Server Structure Model");
  sqlReader = {
    ...sql,
    host: process.env.DB_HOST_READER,
    timezone: "+05:30",
  };
  sqlWriter = {
    ...sql,
    host: process.env.DB_HOST_WRITER,
    timezone: "+05:30",
  };
}

// Connection
var [dbReader, dbWriter]: any = [
  {
    sequelize: new Sequelize(
      sql.database,
      sql.username,
      sql.password,
      sqlReader
    ),
  },
  {
    sequelize: new Sequelize(
      sql.database,
      sql.username,
      sql.password,
      sqlWriter
    ),
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
  element.name["users"] = require(path.join(
    __dirname,
    "/modules/users/users-model"
  ))(eleName, Sequelize);
  element.name["departments"] = require(path.join(
    __dirname,
    "/modules/departments/department-model"
  ))(eleName, Sequelize);
  element.name["roles"] = require(path.join(
    __dirname,
    "/modules/roles/role-model"
  ))(eleName, Sequelize);
  element.name["ticket_replies"] = require(path.join(
    __dirname,
    "/modules/ticketReplies/ticket-replies-model"
  ))(eleName, Sequelize);
  element.name["tickets"] = require(path.join(
    __dirname,
    "/modules/tickets/ticket-model"
  ))(eleName, Sequelize);
  element.name["ticket_settings"] = require(path.join(
    __dirname,
    "/modules/ticketSettings/ticket-setting-model"
  ))(eleName, Sequelize);
  element.name["organization"] = require(path.join(
    __dirname,
    "/modules/organizations/organization-model"
  ))(eleName, Sequelize);
  element.name["user_logs"] = require(path.join(
    __dirname,
    "/modules/userLogs/user-login-logs-model"
  ))(eleName, Sequelize);
  element.name["privileges"] = require(path.join(
    __dirname,
    "/modules/privileges/model"
  ))(eleName, Sequelize);
  // Model Association
  Object.keys(element.name).forEach(function (modelName) {
    if ("associate" in element.name[modelName]) {
      element.name[modelName].associate(element.name);
    }
  });
});

dbReader.Sequelize = Sequelize;
dbWriter.Sequelize = Sequelize;

module.exports = { dbReader, dbWriter };
