const express = require("express");

const { userController } = require("../../controllers");


const router = express.Router();



/** create user */
router.post(
  "/register",

  userController.register
);

/** Get user list */
router.post(
  "/login",

  userController.login
);

/** Get user details by id */
router.get(
  "/allusers",

  userController.getAllUser
);
/** Send mail */
// router.post(
//   "/send-mail",
//   userController.sendMail
// );

/**forgot password */
router.post("/forgot-password",userController.forgetPassword);

/**rset password */
router.post('/reset-password',userController.updatePassword)
/** user details update by id */
// router.put(
//   "/update-details/:userId",

//   userController.updateDetails
// );

// /** Delete user */
// router.delete(
//   "/delete-user/:userId",

//   userController.deleteUser
// );

// /** Send mail */
// router.post(
//   "/send-mail",

//   userController.sendMail
// );

module.exports = router;


// const { userController } = require("../controller/index");
// const { auth } = require("../middleware/auth");



// module.exports = routes;