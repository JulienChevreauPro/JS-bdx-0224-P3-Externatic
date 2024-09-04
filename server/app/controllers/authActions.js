const login = async (req, res, next) => {
  const { token } = req;

  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  try {
    
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = { login };
