const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const headerData = req.headers.authorization;
  if (!headerData.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = headerData.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    req.user = decoded;
    next();
  } else {
    return res.status(401).json({ message: "Token Failed to verify" });
  }
};

module.exports = { checkLogin };
