module.exports = function (sequelize: any, DataTypes: any) {
  const user_logs = sequelize.define(
    "user_logs",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      is_login: {
        type: DataTypes.INTEGER, //1=login or 0= logout
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "user_logs",
      timestamps: false,
      underscored: true,
    }
  );
  return user_logs;
};
