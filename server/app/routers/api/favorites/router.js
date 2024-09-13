const express = require("express");

const router = express.Router();

const {
  addFavorite,
  removeFavorite,
  readFavorite,
} = require("../../../controllers/favoriteActions");

const { verifyAuthCurrent } = require("../../../middlewares/verifyAuthCurrent");

router.get("/", verifyAuthCurrent, readFavorite);

router.post("/", verifyAuthCurrent, addFavorite);

router.delete("/", verifyAuthCurrent, removeFavorite);

module.exports = router;
