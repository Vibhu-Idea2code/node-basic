const express = require("express");
const { userController } = require("../../controllers");

const router = express.Router();
// create user
router.post(
  "/create-user",

  userController.register
);

// router.get("/list", userController.register);

router.post("/login", userController.login);
// router.get("/id/:", rtypeController.getRestaurantTypeDetails);

// router.put("/update/:", rtypeController.updateRestaurantType);

// router.delete(
//   "/delete/:restauranttypeId",
//   rtypeController.deleteRestaurantType
// );
module.exports = router;
