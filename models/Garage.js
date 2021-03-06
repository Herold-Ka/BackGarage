module.exports = (dbinfo, Sequelize) => {
    // define = create table
    return dbinfo.define(
        "tbl_garage", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            adresse: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            cp: {
                type: Sequelize.DataTypes.INTEGER(5),
                allowNull: false
            },
            ville: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            tel: {
                type: Sequelize.DataTypes.STRING(10),
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING(100),
                unique: true,
                allowNull: false
            },
        }, {
            timesstamps: true,
            underscored: true
        }
    );
};