const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const readByCandidates = async (req, res, next) => {
  if (req.auth.role === 'candidat') {
    res.sendStatus(403);
    return;
  }

  try {
    const candidates = await tables.user.readByCandidates(
      req.params.id
    );

    if (candidates === null) {
      res.sendStatus(404);
    } else {
      res.json(candidates);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.user.create(user);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, add, read, readByCandidates };   