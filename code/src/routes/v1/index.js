const express = require("express");
const userRoute = require("./user.route");
const passport=require('passport');
// const authRoute=require('./auth.route');
// const tokenRoute = require("./token.route");
const router = express.Router();
router.use("/user", userRoute);

// router.use('/auth',authRoute);
// router.use("/token", tokenRoute);
// require("../../middlewares/auth");

// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/protected',
//         failureRedirect: '/auth/google/failure'
// }));
// app.get('/auth/protected',(req,res)=>{
//     res.send('hello')
// })

module.exports = router;