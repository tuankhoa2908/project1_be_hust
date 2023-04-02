const db = require("../models/index");
const listClass = db.list_class;
const user = db.user;

const uuid = require("uuid");

module.exports = {
  createClass: async (req, res) => {
    let id = uuid.v4();
    //tra cứu số dư trong ví người dùng đăng kí lớp 
    const userBalance = await user.findOne({
      attributes: ["currentBalance"],
      where: {
        userId: req.body.classOwnerId,
      },
      raw: true,
    });
    if (userBalance.currentBalance < 50000)
      return res.send(
        "Tài khoản của bạn không đủ tiền để trả phí đặt lớp (50.000 VND)"
      );
    await user.update(
      {
        currentBalance: userBalance.currentBalance - 50000,
      },
      {
        where: {
          userId: req.body.classOwnerId,
        },
      }
    );
    await listClass.create({
      classId: id,
      classOwnerId: req.body.classOwnerId,
      phoneContactClass: req.body.phoneContact,
      subjectClass: req.body.subject,
      gradeClass: req.body.grade,
      salaryPerSession: req.body.salaryPerSession,
      sessionPerWeek: req.body.sessionPerWeek,
      requireJob: req.body.requireJob,
      timeSession: req.body.timeSession,
      genderStudent: req.body.genderStudent,
      nameStudent: req.body.nameStudent,
      schoolStudent: req.body.schoolStudent,
      salaryPerMonth: req.body.salaryPerSession * req.body.sessionPerWeek * 4,
    });
    res.send("Đăng kí thông tin lớp thành công");
  },
  deleteClass: async (req, res) => {
    await listClass.destroy({
      where: {
        classId: req.body.classId,
      },
    });
  },
};
