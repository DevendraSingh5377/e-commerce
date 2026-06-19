const express = require("express");
const router = express.Router();

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/address.controller");

const verifyJWT = require("../middleware/auth.middleware");

router.post("/add", verifyJWT, addAddress);
router.get("/", verifyJWT, getAddresses);
router.put("/:id", verifyJWT, updateAddress);
router.delete("/:id", verifyJWT, deleteAddress);
router.patch("/default/:id", verifyJWT, setDefaultAddress);

module.exports = router;