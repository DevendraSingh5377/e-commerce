const express = require("express");

const router = express.Router();

const verifyJWT =
  require("../middleware/auth.middleware");

const adminOnly =
  require("../middleware/admin.middleware");

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require(
  "../controllers/user.controller"
);

router.get(
  "/",
  verifyJWT,
  adminOnly,
  getAllUsers
);

router.patch(
  "/role/:id",
  verifyJWT,
  adminOnly,
  updateUserRole
);

router.delete(
  "/:id",
  verifyJWT,
  adminOnly,
  deleteUser
);

module.exports = router;