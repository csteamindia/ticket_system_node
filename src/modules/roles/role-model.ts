module.exports = function (sequelize: any, DataTypes: any) {
  const roles: any = sequelize.define(
    "roles",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      roles: DataTypes.STRING(15), //1=admin ,2=supervisor,3=agent,4=user
    },
    {
      tableName: "roles",
      timestamps: false,
      underscored: true,
    }
  );
  roles.associate = function (model: any) {
    roles.hasMany(model.users, {
      foreignKey: "id",
      targetKey: "role",
    });
    roles.hasMany(model.ticket_replies, {
      foreignKey: "id",
      targetKey: "agent_id",
    });
    roles.hasMany(model.tickets, {
      foreignKey: "id",
      targetKey: "agent_id",
    });
  };
  return roles;
};
