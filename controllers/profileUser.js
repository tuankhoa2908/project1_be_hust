const db = require("../models/index");
const profileUser = db.profile_user;
const user = db.user;
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
      attributes: [
        "fullnameUser",
        "ageUser",
        "genderUser",
        "addressUser",
        "phoneUser",
      ],
      where: {
        userProfileId: req.body.userProfileId,
      },
      include: [{ model: user, attributes: ["email"] }],
      raw: true,
    });
    if (data_user === null)
      return res.send("Không tìm thấy thông tin người dùng. ");
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
