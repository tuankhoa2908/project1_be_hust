const express = require("express");
const router = express.Router();
const { listClass } = require('../controllers/index');

router.post("/createClass", listClass.createClass);
router.get("/deleteClass", listClass.deleteClass);

module.exports = router;