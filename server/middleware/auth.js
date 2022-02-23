const passport = require("passport");

const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/user");
const bcrypt = require("bcryptjs");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["token"] || req.cookies.token;
  }
  return token;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      UserModel.findOrCreate(
        { email: profile.email[0].value },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.TOKEN_KEY,
      jwtFromRequest: cookieExtractor,
    },
    async (jwt_payload, done) => {
      UserModel.findOne({ id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }
  )
);

// const config = process.env;

// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-access-token"] ||
//     req.cookies.token;

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// module.exports = verifyToken;
