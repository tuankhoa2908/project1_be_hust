const express = require("express");
const router = express.Router();
const { listTutor } = require("../controllers/index");

router.post("/signupTutor", listTutor.signupTutor);
router.get("/listTutor", listTutor.listTutor);

module.exports = router;
