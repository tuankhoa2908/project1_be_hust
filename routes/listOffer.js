const express = require("express");
const router = express.Router();
const { listOffer } = require("../controllers/index");

router.post("/create", listOffer.create);
router.get("/showMyListOffer", listOffer.showMyListOffer);
router.post("/acceptOffer", listOffer.acceptOffer);
router.post("/deniedOffer", listOffer.deniedOffer);

module.exports = router;
