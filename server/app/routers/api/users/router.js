const express = require("express");

const {
  readUserValidation,
  readCandidateValidation,
  readByConsultantValidation,
  addUserValidation,
  updateCandidateValidation,
  deleteUserValidation,
} = require("../../../middlewares/userValidator");
const { hashPassword } = require("../../../middlewares/hashPassword");
const { verifyAuthCurrent } = require("../../../middlewares/verifyAuthCurrent");

const {
  add,
  read,
  readByConsultant,
  readCandidate,
  browse,
  updateCandidate,
  deleteUser,
} = require("../../../controllers/userActions");

const router = express.Router();

router.get("/", browse);

router.get("/:id", verifyAuthCurrent, readUserValidation, read);

router.get(
  "/consultants/:id",
  verifyAuthCurrent,
  readByConsultantValidation,
  readByConsultant
);

router.get(
  "/candidates/:id",
  verifyAuthCurrent,
  readCandidateValidation,
  readCandidate
);

router.post("/", addUserValidation, hashPassword, add);

router.put(
  "/:id",
  verifyAuthCurrent,
  updateCandidateValidation,
  updateCandidate
);

router.delete("/:id", verifyAuthCurrent, deleteUserValidation, deleteUser);

module.exports = router;
