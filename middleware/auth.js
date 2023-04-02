const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

module.exports = verifyToken;
