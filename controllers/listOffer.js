const db = require("../models/index");
const listOffer = db.list_offer;
const listClass = db.list_class;

const uuid = require("uuid");
var id = uuid.v1();

module.exports = {
  create: async (req, res) => {
    await listOffer.create({
      offerId: id,
      classOfferId: req.body.classOfferId,
      tutorOfferId: req.body.tutorOfferId,
      salaryPerMonth: req.body.salaryPerMonth,
    });
  },
  showMyListOffer: async (req, res) => {
    const listOffer = await listClass.findAll({
      where: {
        classOwnerId: req.body.id,
      },
    }); 
    res.send(listOffer);
  },
};
