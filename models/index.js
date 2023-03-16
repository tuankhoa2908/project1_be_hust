"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js")
    );
  })
  .forEach((file) => {
    // var model = sequelize['import'](path.join(__dirname, file),(sequelize, Sequelize.DataTypes));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // const model = require(path.join(__dirname, file))(
    //   sequelize,
    //   Sequelize.DataTypes
    // );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Reset Database
// (async () => {
//   await db.sequelize.sync({ force: true });
// })();

console.log("All thing seem Successful");
console.log("App running on port: 3000");

// Change Database
// (async () => {
//   await db.sequelize.sync({ alter: true });
// })();

module.exports = db;
