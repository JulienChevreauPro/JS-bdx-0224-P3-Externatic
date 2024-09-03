const express = require("express");

const router = express.Router();

const { add } = require("../../../controllers/candidacyActions");

const { verifyAuthCurrent } = require("../../../middlewares/verifyAuthCurrent");

router.post("/:id", verifyAuthCurrent, add);

module.exports = router;
