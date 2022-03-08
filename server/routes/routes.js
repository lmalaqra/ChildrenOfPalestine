const { google } = require("googleapis");
const express = require("express");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user");
require("../middleware/auth");
const JWT = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

const router = express.Router();
const Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function getFacebookUserData(access_token) {
  const { data } = await axios({
    url: "https://graph.facebook.com/me",
    method: "get",
    params: {
      fields: [
        "id",
        "email",
        "first_name",
        "last_name",
        "picture",
        "gender",
      ].join(","),
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

    res.cookie("token", token, { httpOnly: true }).json({
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
  UserModel.findOneAndUpdate(
    { _id: decoded.user._id },
    req.body,
    (err, doc) => {
      if (err) res.send("wrong Id");
      res.status(200).json({ message: "succesfully patched", user: doc });
    }
  );
});
//gooogle auth
router.post("/api/google", async (req, res) => {
  const { tokenId, accessToken } = req.body;
  const ticket = await Client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, name, picture } = ticket.getPayload();
  const { OAuth2 } = google.auth;
  const oauth2Client = new OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const peopleAPI = google.people({
    version: "v1",
    auth: oauth2Client,
  });
  const { data } = await peopleAPI.people.get({
    resourceName: "people/me",
    personFields: "genders",
  });
  console.log(data);

  let newUser = await UserModel.findOne({ email: email });

  if (!newUser) {
    newUser = new UserModel({ email, name, picture });

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

//facebook auth
router.post("/facebook/auth", async (req, res) => {
  const { email, first_name, last_name, picture } = await getFacebookUserData(
    req.body.token
  );
  console.log(picture.data.url);
  let user = await UserModel.findOne({ email });
  const name = first_name + last_name;
  if (!user) {
    user = await UserModel.create({ email, name, picture: picture.data.url });
  }
  const body = { _id: user._id, email: user.email };
  const token = jwt.sign({ user: body }, process.env.TOKEN_KEY);
  res.cookie("token", token, { httpOnly: true });
  res.json({ id: user._id });
});

module.exports = router;
