var express = require("express");
var router = express.Router();

const user = require("./user");
const transaction = require("./listTransaction");
const profileUser = require("./profileUser");
const listClass = require("./listClass");
const listOffer = require("./listOffer");
const listTutor = require("./listTutor");

router.use("/user", user);
router.use("/transaction", transaction);
router.use("/profile", profileUser);
router.use("/class", listClass);
router.use("/offer", listOffer);
router.use("/tutor", listTutor);

module.exports = router;
