const db = require("../models/index");
const user = db.user;

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const listClass = require("./listClass");

module.exports = {
  create: async (req, res) => {
    var idRandom = uuid.v4();
    // const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    // // var result = {};
    // var checkUser = USER_REGEX.test(req.body.username);
    // var checkPassword = PWD_REGEX.test(req.body.password);
    // if (checkUser === false)
    //   return res.send("hange your account according to the given format");
    // if (checkPassword === false)
    //   res.send("Change your password according to the given format ");
    await user.create({
      userId: idRandom,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    });
    res.send("Create Your Account Successful");
  },
  login: async (req, res) => {
    const data = await user.findOne({
      attributes: ["userId", "password"],
      where: {
        username: req.body.username,
      },
    });
    if (data === null) return res.send("Account doesn't exist");
    await bcrypt.compare(req.body.password, data.password).then((result) => {
      if (result === true) return res.send("Login successful");
      if (result === false) return res.send("Wrong Password");
    });
  },
  changePassword: async (req, res) => {
    const data = await user.findOne({
      attributes: ["userId", "password"],
      where: {
        username: req.body.username,
      },
      raw: true,
    });
    await bcrypt
      .compare(req.body.currentPassword, data.password)
      .then(async (result) => {
        if (result === false) return res.send("Wrong Password");
        if (result === true) {
          await user.update(
            {
              password: bcrypt.hashSync(req.body.newPassword, 10),
            },
            {
              where: { userId: data.userId },
            }
          );
          return res.send("Change Password Successful");
        }
      });
  },
};
