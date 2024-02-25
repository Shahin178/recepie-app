const jwt = require("jsonwebtoken");

const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
    if (!token) {
      return res.status(500).json({
        message: "Log in first",
      });
    }
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data.User;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
module.exports = { VerifyToken };
