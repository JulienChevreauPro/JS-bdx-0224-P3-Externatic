const express = require("express");

const router = express.Router();

const { verifyAuthCurrent } = require("../../../middlewares/verifyAuthCurrent");

const { browse, read, add, del } = require("../../../controllers/offerActions");

router.get("/", browse);

router.get("/:id", verifyAuthCurrent, read);

router.post("/", verifyAuthCurrent, add);

router.delete("/:id", verifyAuthCurrent, del);

module.exports = router;
