const { UserModel, ArticleModel } = require("../../model/user");

const CreateNewDraftArticle = async (user) => {
  return await ArticleModel.create({ user, status: "new" });
};

const updateDraftImageArticle = async (file, articleId) => {
  return await ArticleModel.findOneAndUpdate(
    { _id: articleId },
    { $push: { images: file } }
  );
};
const updateDraftArticle = async (id, contentToUpdate) => {
  return await ArticleModel.findOneAndUpdate({ id }, { contentToUpdate });
};

const deleteVoidArticles = async (userId) => {
  return await ArticleModel.deleteMany({
    status: "new",
  });
};

module.exports = {
  CreateNewDraftArticle,
  updateDraftImageArticle,
  updateDraftArticle,
  deleteVoidArticles,
};
