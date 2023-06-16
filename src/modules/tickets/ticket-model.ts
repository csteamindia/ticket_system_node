module.exports = function (sequelize: any, DataTypes: any) {
  const tickets: any = sequelize.define(
    "tickets",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      org_id: DataTypes.INTEGER,
      department: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      guest_name: DataTypes.STRING(256),
      guest_email: DataTypes.STRING(256),
      agent_id: DataTypes.INTEGER,
      access: DataTypes.STRING(10),
      type: DataTypes.INTEGER, //1=ticket,2=bug
      status: DataTypes.INTEGER,
      priority: DataTypes.INTEGER,
      date: DataTypes.DATE(),
      last_update: DataTypes.DATE(),
      subject: DataTypes.TEXT(),
      content: DataTypes.TEXT(),
      files: DataTypes.TEXT(),
      transferred_from: DataTypes.STRING(256),
      rating: DataTypes.FLOAT,
      rating_msg: DataTypes.TEXT(),
    },
    {
      tableName: "tickets",
      timestamps: false,
      underscored: true,
    }
  );
  return tickets;
};
