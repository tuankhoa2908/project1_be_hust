const db = require("../models/index");
// const profileUser = db.profileUser;
const listTransaction = db.list_transaction;
const user = db.user;

const uuid = require("uuid");

module.exports = {
  deposit: async (req, res) => {
    var id = uuid.v4();
    await listTransaction.create({
      transactionId: id,
      userTransactionId: req.body.userId,
      typeTransaction: "Recharge",
      timeTransaction: req.body.timeTransaction,
      balanceFluctuations: req.body.money,
    });
    let data = await user.findOne({
      attributes: ["currentBalance"],
      where: {
        userId: req.body.userId,
      },
      raw: true,
    });
    console.log(typeof data.currentBalance);
    let currentBalance = data.currentBalance + parseInt(req.body.money);
    // console.log(typeof req.body.money);
    await user.update(
      {
        currentBalance: currentBalance,
      },
      {
        where: {
          userId: req.body.userId,
        },
      }
    );
    res.send(`Nap tien thanh cong, so tien hien tai la : ${currentBalance}`);
  },
  withdraw: async (req, res) => {
    let data = await user.findOne({
      attributes: ["currentBalance"],
      where: {
        userId: req.body.userId,
      },
      raw: true,
    });
    if (parseInt(req.body.money) > data.currentBalance)
      return res.send("So du tai khoan cua ban khong du");

    await listTransaction.create({
      transactionId: id,
      userTransactionId: req.body.userId,
      typeTransaction: "Withdraw",
      timeTransaction: req.body.timeTransaction,
      balanceFluctuations: req.body.money,
    });

    let currentBalance = data.currentBalance - parseInt(req.body.money);
    await user.update(
      {
        currentBalance: currentBalance,
      },
      {
        where: {
          userId: req.body.userId,
        },
      }
    );
    res.send(`Rut tien thanh cong, so tien hien tai la : ${currentBalance}`);
  },
  transfer: async (req, res) => {},
};
