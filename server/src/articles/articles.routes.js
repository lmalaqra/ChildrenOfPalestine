const {
  CreateNewDraftArticle,
  updateDraftImageArticle,
  updateDraftArticle,
  deleteVoidArticles,
} = require("./services");
const express = require("express");
const fileUploader = require("../../config/cloudinary.config");
const videoUploader = require("../../config/cloudinary-video.config");
const router = express.Router();

router.post(
  "/cloudinary-upload",
  fileUploader.single("file"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      if (!req.file || !req.query.articleId) {
        next(new Error("no file uploded"));
      }
      await updateDraftImageArticle(req.file, req.query.articleId);

      res.status(200).json({ url: req.file.path });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
);
router.post(
  "/cloudinary-upload-video",
  videoUploader.single("file"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      if (!req.file || !req.query.articleId) {
        next(new Error("no file uploded"));
      }
      // await updateDraftImageArticle(req.file, req.query.articleId);

      res.status(200).json({ url: req.file.path });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
);

router.get("/articles", async (req, res) => {
  if (req.query.articleId) {
    res.status(404).json({ msg: "article already exists" });
    return;
  }

  const article = await CreateNewDraftArticle(req.user);
  res.json({ articleId: article._id });
});

router.patch("/articles", async (req, res) => {
  try {
    const article = await updateDraftArticle(req.query.articleId, req.body);
    res.status(200).send("successfully saved article");
  } catch (e) {
    res.status(403).send("error article didn't update");
  }
});
router.delete("/articles/void", async (req, res) => {
  try {
    await deleteVoidArticles(req.user._id);
    res.status(200).send("sucessfully deleted void articles");
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

router.get("/article_test", (req, res) => {});
module.exports = router;
