module.exports = function (sequelize: any, DataTypes: any) {
    var configuration: any = sequelize.define('configuration', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        org_id: DataTypes.INTEGER,
        project_id: DataTypes.INTEGER,
        sub_head: DataTypes.STRING(16),
        uom: DataTypes.INTEGER,
        created_at: DataTypes.DATE()

    }, {
        tableName: 'configuration',
        timestamps: false,
        underscored: true,
    });
    return configuration;
};
