const express = require("express");

const router = express.Router();

const {
  add,
  read,
  readByCandidates,
  readCandidates,
  browse,
  updateCandidate,
  deleteUser,
} = require("../../../controllers/userActions");

const { hashPassword } = require("../../../middlewares/hashPassword");
const { verifyAuthCurrent } = require("../../../middlewares/verifyAuthCurrent");

router.get("/", browse);

router.get("/:id", verifyAuthCurrent, read);

router.get("/consultants/:id", verifyAuthCurrent, readByCandidates);

router.get("/candidates/:id", verifyAuthCurrent, readCandidates);

router.post("/", hashPassword, add);

router.put("/:id", verifyAuthCurrent, updateCandidate);

router.delete("/:id", verifyAuthCurrent, deleteUser);

module.exports = router;