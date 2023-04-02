const db = require("../models/index");
const listOffer = db.list_offer;
const listClass = db.list_class;
const user = db.user;
const walletAdmin = db.wallet_admin;

const uuid = require("uuid");
const { Sequelize } = require("../models/index");

module.exports = {
  create: async (req, res) => {
    let idOffer = uuid.v4();
    let idWalletAdmin = uuid.v4();
    let money = await user.findOne({
      attributes: ["currentBalance"],
      where: {
        userId: req.body.tutorOfferId,
      },
      raw: true,
    });
    paymentPlatform = parseInt(req.body.salaryPerMonth) * 0.5;
    if (money.currentBalance < paymentPlatform)
      return res.send(
        "Vui lòng nạp thêm tiền để thanh toán tiền cọc nhận lớp (50% số tiền nhận trong một tháng)"
      );
    await user.update(
      {
        currentBalance: money.currentBalance - paymentPlatform,
      },
      {
        where: {
          userId: req.body.tutorOfferId,
        },
      }
    );
    await listOffer.create({
      offerId: idOffer,
      classOfferId: req.body.classOfferId,
      tutorOfferId: req.body.tutorOfferId,
      salaryPerMonth: req.body.salaryPerMonth,
    });
    await walletAdmin.create({
      transactionAdminId: idWalletAdmin,
      timeAdminTransaction: req.body.timeAdminTransaction,
      AmountMoney: paymentPlatform,
      fromUserId: req.body.tutorOfferId,
    }),
      res.send("Create Offer Successful ");
  },
  showMyListOffer: async (req, res) => {
    const listOffer = await listClass.findAll({
      where: {
        classOwnerId: req.body.id,
      },
    });
    res.send(listOffer);
  },
  acceptOffer: async (req, res) => {
    const datauser = await listOffer.findAll({
      attributes: ["offerId", "tutorOfferId", "salaryPerMonth"],
      where: {
        classOfferId: req.body.classOfferId,
      },
      raw: true,
    });
    await listClass.update(
      {
        statusClass: "Accepted Class",
      },
      {
        where: {
          classId: req.body.classOfferId,
          tutorAcceptedId: req.body.tutorAcceptedId,
        },
      }
    );
    await listOffer.destroy({
      where: {
        classOfferId: req.body.classOfferId,
      },
    });
    datauser.map(async (element) => {
      let x = await user.findOne({
        where: {
          userId: element.tutorOfferId,
        },
      });
      if (req.body.tutorAcceptedId != element.tutorOfferId) {
        await user.update(
          {
            currentBalance: x + element.salaryPerMonth * 0.4,
          },
          {
            where: {
              userId: element.tutorOfferId,
            },
          }
        );
      }
    });
    await listOffer.destroy({
      where: {
        classOfferId: req.body.classOfferId,
      },
    });
    res.send(`Has accepted a tutor with ID ${req.body.tutorAcceptedId}`);
  },
  deniedOffer: async (req, res) => {
    await user.update(
      {
        currentBalance: Sequelize.literal(
          "currentBalance + salaryPerMonth * 0.5"
        ),
      },
      {
        where: {
          userId: req.body.tutorId,
        },
      }
    );
    await listOffer.destroy({
      where: {
        offerId: req.body.offerId,
      },
    });
  },
};
