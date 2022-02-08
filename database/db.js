/** Start Require module **
 */
/**
 * Sequelize is a promise-based ORM for Node.js.
 * Sequelize is easy to learn and has dozens of cool features like synchronization, association, validation, etc.
 * It also has support for PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL.
 * I am assuming you have some form of SQL database service started on your machine. I am currently using MySQL.

ORM :signifie Object-Relational Mapping. Un ORM est un ensemble de classes permettant de manipuler les tables d’une base de données relationnelle comme s’il s’agissait d’objets. * */
const Sequelize = require('sequelize');
/** end Require module **
 ***/
/** Start connexion to database  **
 */
// make our const db ;
const db = {};
/**
 * new Sequelize({database},{username},{password for MAC},options{
 *     host:{hostname},
 *     dialect:  one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' , The dialect of the database you are connecting to. One of mysql, postgres, sqlite and mssql.
 *     port: if you don't have change you mysql default port it will 3306, or if you change make sure to use you port ,
 *     operatorsAliases: {false},
 *     pool: { sequelize connection pool configuration
 *         max: { 5 numbre of max conn in you database}, Maximum number of connection in pool default: 5
 *         min: {0 } Minimum number of connection in pool,default: 0,
 *         acquire: {30000 } The maximum time, in milliseconds, that pool will try to get connection before throwing error, default 60000,
 *         idle: { 10000 } The maximum time, in milliseconds, that a connection can be idle before being released.
 *     }
 *
 * @type {Sequelize}
 */
const dbinfo = new Sequelize("test", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3308,
    pool: {
        max: 5,
        min: 0,
    }
});
dbinfo.authenticate()
    .then(() => {
        console.log('connection to db');
    })
    .catch(err => {
        console.error('unable to connect to the databasse:' + err);
    });
/** end connexion to database **
 */

//models/tables
/*
 ** Start Require models/tables **
 *
 *
 *

 * require every table in database
 * we need it in this file to make  associations
 * we all so require the associations table we make , we need some data in that table
 *
 */
db.atelier = require('../models/Atelier')(dbinfo, Sequelize);
db.garage = require('../models/Garage')(dbinfo, Sequelize);
db.voiture = require('../models/Voiture')(dbinfo, Sequelize);
db.client = require('../models/Client')(dbinfo, Sequelize);
db.emp = require('../models/Emp')(dbinfo, Sequelize);
/* There are four type of associations available in Sequelize
 *
 * BelongsTo     :  associations are associations where the foreign key for the one-to-one relation exists on the source model.
 * HasOne        :  associations are associations where the foreign key for the one-to-one relation exists on the target model.
 * HasMany       :  associations are connecting one source with multiple targets. The targets however are again connected to exactly one specific source.
 * BelongsToMany :  associations are used to connect sources with multiple targets. Furthermore the targets can also have connections to multiple sources.
 *
 ** Start Relation **
 ***
 *
 *  the garage can have Many atelier : atelier: 1,1  garage : 1,N
 */
db.garage.hasMany(db.atelier, { foreignKey: "garageId" });
db.client.hasMany(db.voiture, { foreignKey: "clientId" })
db.voiture.belongsTo(db.client, { foreignKey: "clientId" })
    //db.atelier.hasOne(db.atelier, { foreignKey: "garageId" })
db.dbinfo = dbinfo;
db.Sequelize = Sequelize;
/**
 * Sync all defined models to the DB.
 * similar for sync: you can define this to always force sync for models
 */
//dbinfo.sync({ force: true });
/* The module.exports or exports is a special object which is included in every JS file in the Node.js application by default.
 * module is a variable that represents current module and exports is an object that will be exposed as a module.
 * So, whatever you assign to module.exports or exports, will be exposed as a module.*/
module.exports = db;