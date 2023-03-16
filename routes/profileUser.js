const express = require("express");
const router = express.Router();
const { profile } = require("../controllers/index");

router.post("/create", profile.updateProfile);

module.exports = router;
