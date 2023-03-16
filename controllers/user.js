const db = require("../models/index");
const user = db.user;

const bcrypt = require("bcrypt");
const uuid = require("uuid");

var idRandom = uuid.v4();

module.exports = {
  create: async (req, res) => {
    // var result = {};
    console.log(req.body);
    await user.create({
      userId: idRandom,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    });
    res.send("ok");
  },
  login: async (req, res) => {
    const data = await user.findOne({
      attributes: ["userId", "password"],
      where: {
        username: req.body.username,
      },
    });
    if (data === null) return res.send("Account doesn't exist");
    await bcrypt.compare(req.body.password, data.password).then((result)=>
    {
        if (result === true) res.send("Login successful");
        if (result === false) res.send("Wrong Username Or Password");
    })
  },
};
