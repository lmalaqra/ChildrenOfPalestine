const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("../middleware/auth");
const JWT = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const user = require("../model/user");
const axios = require("axios");

const router = express.Router();
const Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function getFacebookUserData(access_token) {
  const { data } = await axios({
    url: "https://graph.facebook.com/me",
    method: "get",
    params: {
      fields: ["id", "email", "first_name", "last_name"].join(","),
      access_token: access_token,
    },
  });
  console.log(data); // { id, email, first_name, last_name }
  return data;
}

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    const body = { _id: req.user._id, email: req.user.email };
    const token = jwt.sign({ user: body }, process.env.TOKEN_KEY);

    res.cookie("token", token, { httpOnly: true });
    res.json({
      message: "Signup successful",
      user: req.user,
    });
    next();
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.TOKEN_KEY);
        res.cookie("token", token, { httpOnly: true });
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.patch("/signup", async (req, res, next) => {
  const decoded = await JWT.verify(req.cookies["token"], process.env.TOKEN_KEY);

  // const user = await User.findOne({ _id: decoded.user._id });
  // console.log(user);
  User.findOneAndUpdate({ _id: decoded.user._id }, req.body, (err, doc) => {
    if (err) res.send("wrong Id");
    res.status(200).json({ message: "succesfully patched", user: doc });
  });
});

router.post("/api/google", async (req, res) => {
  const { tokenId } = req.body;
  const ticket = await Client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, name, picture } = ticket.getPayload();

  let newUser = await User.findOne({ email: email });
  console.log(email, name, picture);

  if (!newUser) {
    newUser = new User({ email, name, picture });

    await newUser.save();

    console.log(newUser);
  }

  const body = { _id: newUser._id, email: newUser.email };
  const token = jwt.sign({ user: body }, process.env.TOKEN_KEY);
  res.cookie("token", token, { httpOnly: true });
  res.json({ id: newUser._id });
});

// router.post("/api/facebook/auth", async (req, res) => {
//   const token = await getAccessTokenFromCode(req.body.code);
//   console.log(token);
// });
router.post("/facebook/auth", async (req, res) => {
  const { email, first_name, last_name } = await getFacebookUserData(
    req.body.token
  );

  let user = await User.findOne({ email });
  const name = first_name + last_name;
  if (!user) {
    user = await User.create({ email, name });
  }
  const body = { _id: user._id, email: user.email };
  const token = jwt.sign({ user: body }, process.env.TOKEN_KEY);
  res.cookie("token", token, { httpOnly: true });
  res.json({ id: user._id });
});

router.get("/test", (req, res) => {});
module.exports = router;