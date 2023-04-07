const express = require("express");
const router = express.Router();
const { profile } = require("../controllers/index");

router.post("/create", profile.createProfile);
router.post("/search_user", profile.searchProfile);

module.exports = router;
