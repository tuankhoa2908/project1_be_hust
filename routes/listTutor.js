const express = require("express");
const router = express.Router();
const { listTutor } = require('../controllers/index');

router.post("/becomeTutor", listTutor.signupTutor);

module.exports = router;