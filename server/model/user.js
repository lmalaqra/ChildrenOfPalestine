const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  name: String,
  gender: String,
  birthDate: Date,
  picture: String,
});

const UserModel = mongoose.model("user", UserSchema);

const ArticleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  content: String,
  images: [],
  status: String,
});

const ArticleModel = new mongoose.model("article", ArticleSchema);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!this.password) return;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});
UserSchema.plugin(findOrCreate);
UserSchema.methods.isValidPassword = async (password) => {
  const user = this;
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

module.exports = { UserModel, ArticleModel };
