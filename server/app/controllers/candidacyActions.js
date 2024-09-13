const tables = require("../../database/tables");

const add = async (req, res, next) => {
  const candidacy = req.body;

  try {
    const insertId = await tables.candidacy.create(candidacy);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = { add };
