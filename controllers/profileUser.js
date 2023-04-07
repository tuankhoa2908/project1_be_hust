const db = require("../models/index");
const profileUser = db.profile_user;
const uuid = require("uuid");



module.exports = {
  createProfile: async (req, res) => {
    var id = uuid.v4();
    console.log(req.body);
    await profileUser.create({
      profileId: id,
      fullnameUser: req.body.fullnameUser,
      ageUser: req.body.ageUser,
      genderUser: req.body.genderUser,
      addressUser: req.body.addressUser,
      phoneUser: req.body.phoneUser,
      userProfileId: req.body.userId,
    });
    res.send("update profile successful");
  },
  searchProfile: async (req, res) => {
    const data_user = await profileUser.findOne({
      where: {
        classId: req.body.classId,
      },
      raw: true,
    });
    res.send(data_user);
  },
  updateProfile: async (req, res) => {
    const data = await profileUser.update(
      {
        fullnameUser: req.body.fullnameUser,
        ageUser: req.body.ageUser,
        genderUser: req.body.genderUser,
        addressUser: req.body.addressUser,
        phoneUser: req.body.phoneUser,
      },
      {
        where: {
          profileId: req.body.profileId,
        },
      }
    );
  },
};
