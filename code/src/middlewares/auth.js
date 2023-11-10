const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
// const  GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const passport=require("passport");
require('dotenv').config();
const auth = (token, roles) => {
  jwt.verify(token, jwtSecrectKey, (err, decoded) => {
    console.log(roles,'roles');
    if (err || !roles.find((ele) => ele === decoded.role)) {
      console.log(decoded.role,'decoded.role');
      console.log("=====err=====", err);
      throw Error("You dont have permission");
    }
  });
};

// passport.use(new GoogleStrategy({
//     clientID:     process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5500/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//     done(null,profile);
//   }
//   ));
// passport.serializeUser((user,done)=>{
// done(null,user);
// });

// passport.deserializeUser((user,done)=>{
//   done(null,user);
// })

module.exports = {
  auth,
};