const express = require("express");

const { protect } = require("../middleware/auth.js");

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  deleteAllCart,
} = require("../controllers/cartController.js");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);

router.put("/:itemId", protect, updateCartItem);

router.delete("/:itemId", protect, removeFromCart);

router.delete("/", protect, deleteAllCart);

module.exports = router;
