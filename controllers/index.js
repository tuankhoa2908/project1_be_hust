const controllers = {};

controllers.user = require("./user");
controllers.transaction = require("./listTransaction");
controllers.profile = require("./profileUser");
controllers.listClass = require("./listClass");
controllers.listOffer = require("./listOffer");
controllers.listTutor = require("./listTutor");

module.exports = controllers;
