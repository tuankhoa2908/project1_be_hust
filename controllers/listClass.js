const db = require("../models/index");
const listClass = db.list_class;

const uuid = require("uuid");
var id = uuid.v4();

module.exports = {
  createClass: async (req, res) => {
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
      moneyPerMonth: req.body.salaryPerSession * req.body.sessionPerWeek * 4,
    });
    res.send("Update Profile Successfull");
  },
  deleteClass: async (req, res) => {
    await listClass.destroy({
      where: {
        classId: req.body.classId,
      },
    });
  },
};
