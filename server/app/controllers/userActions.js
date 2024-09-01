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

const readCandidates = async (req, res, next) => {
  try {
    const candidatesData = await tables.user.readCandidates(req.params.id);
    res.json(candidatesData);
  } catch (err) {
    next(err);
  }
};

const readByCandidates = async (req, res, next) => {
  try {
    const candidates = await tables.user.readByCandidates(req.params.id);
    if (!candidates || candidates.length === 0) {
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
    const newUser = await tables.user.read(insertId);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const updateCandidate = async (req, res) => {
  const { email, phone } = req.body;
  const candidateId = req.params.id;

  try {
    await tables.user.update({ email, phone }, candidateId);

    res.status(200).json({ message: "Informations mises à jour avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await tables.user.delete(userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  read,
  readByCandidates,
  readCandidates,
  browse,
  updateCandidate,
  deleteUser,
};
