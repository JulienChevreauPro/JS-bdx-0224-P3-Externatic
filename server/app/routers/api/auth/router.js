const express = require("express");

const router = express.Router();

const { verifyAuth } = require("../../../middlewares/verifyAuth");

const { genToken } = require("../../../middlewares/genToken");

const { login } = require("../../../controllers/authActions");

router.post("/", verifyAuth, genToken, login);

module.exports = router;
