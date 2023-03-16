const db = require("../models/index");
const listTutor = db.list_tutor;
const profileUser = db.profile_user;

module.exports = {
  signupTutor: async (req, res) => {
    await listTutor.create({
      tutorId: req.body.userId,
      subjectCanAcpt: req.body.subjectCanAcpt,
      gradeCanAcpt: req.body.gradeCanAcpt,
      timeSession: req.body.timeSession,
      minSalary: req.body.minSalary,
    });
    res.send("You are become to the tutor");
    await profileUser.update(
      {
        role: "tutor",
      },
      {
        where: {
          userProfileId: req.body.userId,
        },
      }
    );
  },
  listTutor: async (req, res) => {
    const data = await listTutor.findAll();
    res.send(data);
  },
};
