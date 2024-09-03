const express = require("express");

const router = express.Router();

const {
  add,
  read,
  readByConsultant,
  readCandidate,
  browse,
  updateCandidate,
  deleteUser,
} = require("../../../controllers/userActions");

const { hashPassword } = require("../../../middlewares/hashPassword");
const { verifyAuthCurrent } = require("../../../middlewares/verifyAuthCurrent");

router.get("/", browse);

router.get("/:id", verifyAuthCurrent, read);

router.get("/consultants/:id", verifyAuthCurrent, readByConsultant);

router.get("/candidates/:id", verifyAuthCurrent, readCandidate);

router.post("/", hashPassword, add);

router.put("/:id", verifyAuthCurrent, updateCandidate);

router.delete("/:id", verifyAuthCurrent, deleteUser);

module.exports = router;
