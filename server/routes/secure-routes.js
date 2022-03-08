const express = require("express");
const router = express.Router();
const { updateDraftImageArticle } = require("../src/articles/services");

router.get("/verify", (req, res, next) => {
  res.json({
    id: req.user.id,
  });
});

router.get("/profile", (req, res, next) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
