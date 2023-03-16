const express = require("express");
const router = express.Router();
const { user } = require("../controllers/index");

router.post("/create", user.create);
router.post("/login", user.login);

module.exports = router;
