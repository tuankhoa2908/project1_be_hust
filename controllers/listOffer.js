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
    const infoClass = await listClass.findOne({
      attributes: ["salaryPerMonth", "classOwnerId"],
      where: {
        classId: req.body.classOfferId,
      },
      raw: true,
    });
    paymentPlatform = infoClass.salaryPerMonth * 0.5;
    console.log(infoClass.salaryPerMonth);
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
      classOwnerOfferId: infoClass.classOwnerId,
      salaryPerMonth: infoClass.salaryPerMonth,
    });
    await walletAdmin.create({
      transactionAdminId: idWalletAdmin,
      timeAdminTransaction: Date.now(),
      amountMoney: paymentPlatform,
      fromUserId: req.body.tutorOfferId,
    }),
      res.send(
        "Nhận lớp thành công, chờ chủ sở hữu xác nhận, bạn sẽ được hoàn lại tiền cọc nếu người đăng từ chối"
      );
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
        tutorAcceptId: req.body.tutorAcceptedId,
      },
      {
        where: {
          classId: req.body.classOfferId,
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
        attributes: ["currentBalance"],
        where: {
          userId: element.tutorOfferId,
        },
      });
      if (req.body.tutorAcceptedId != element.tutorOfferId) {
        await user.update(
          {
            currentBalance: x.currentBalance + element.salaryPerMonth * 0.5,
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
    const data_offer = await listOffer.findOne({
      attributes: ["tutorOfferId", "salaryPerMonth"],
      where: {
        offerId: req.body.offerId,
      },
    });
    const data_user = await user.findOne({
      attributes: ["currentBalance"],
      where: {
        userId: data_offer.tutorOfferId,
      },
    });
    await user.update(
      {
        currentBalance:
          data_user.currentBalance + data_offer.salaryPerMonth * 0.5,
      },
      {
        where: {
          userId: data_offer.tutorOfferId,
        },
      }
    );
    await listOffer.destroy({
      where: {
        offerId: req.body.offerId,
      },
    });
    res.send(
      "Đã hủy lời đề nghị của bạn, kiểm tra số dư trong tài khoản sau khi hoàn trả tiền cọc"
    );
  },
};
