const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

router.get("/profile", (req, res, next) => {
  console.log(req.cookies);
  res.json({
    user: req.user,
  });
});

router.post(
  "/cloudinary-upload",
  fileUploader.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      next(new Error("no file uploded"));
    }
    res.json({ url: req.file.path });
  }
);

router.post("/article/new", (req, res) => {
  console.log(req.body);
});
module.exports = router;
