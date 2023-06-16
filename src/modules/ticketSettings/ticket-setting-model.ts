module.exports = function (sequelize: any, DataTypes: any) {
    const ticket_settings: any = sequelize.define(
      'ticket_settings',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        name: DataTypes.STRING(50),
        value: DataTypes.TEXT(),
      },
      {
        tableName: 'ticket_settings',
        timestamps: false,
        underscored: true,
      },
    );
    return ticket_settings;
  };
  