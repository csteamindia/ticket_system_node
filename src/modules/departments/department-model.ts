module.exports = function (sequelize: any, DataTypes: any) {
    const departments: any = sequelize.define(
      'departments',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        org_id: DataTypes.INTEGER,
        agents: DataTypes.INTEGER, //role of user table
        category: DataTypes.STRING(50),
        type: DataTypes.INTEGER, //1=ticket,2=bug
        reports: DataTypes.INTEGER,
        tickets: DataTypes.TEXT(),
        date: DataTypes.DATE(),
        default: DataTypes.INTEGER,
      },
      {
        tableName: 'departments',
        timestamps: false,
        underscored: true,
      },
    );
  
    return departments;
  };
  