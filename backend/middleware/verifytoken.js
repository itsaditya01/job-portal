const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secret = process.env.JWT_SECRET;

const verifytoken = (req, res, next) => {
  //checking token is valid or not
  const authtoken = req.header("token");
  const newtoken = authtoken.split(" ");
  const token = newtoken[1];
  if (!token) {
    res.status(401).send({ error: "12Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, secret);
    req.id = data.user;
    req.name = data.name;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = verifytoken;
