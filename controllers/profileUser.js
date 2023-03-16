const db = require("../models/index");
const profileUser = db.profile_user;
const uuid = require("uuid");

var id = uuid.v4();

module.exports = {
  updateProfile: async (req, res) => {
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
  searchProfile: async (req, res) => {},
};
