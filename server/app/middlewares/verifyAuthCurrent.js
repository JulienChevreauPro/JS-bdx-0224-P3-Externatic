const jwt = require("jsonwebtoken");

const verifyAuthCurrent = (req, res, next) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    req.auth = {
      role: decodedToken.role,
      id: decodedToken.id,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyAuthCurrent };
