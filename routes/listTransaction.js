const express = require("express");
const router = express.Router();
const { transaction } = require("../controllers/index");

router.post("/recharge", transaction.deposit);
router.post("/withdraw", transaction.withdraw);

module.exports = router;
