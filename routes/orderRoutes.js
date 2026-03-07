const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByNumber,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getOrderStats,
  updatePaymentStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/", protect, createOrder);
router.get("/number/:orderNumber", getOrderByNumber);

// Admin routes (add authentication middleware as needed)
router.get("/", protect, getAllOrders);
router.get("/stats", getOrderStats);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.put("/:id/payment", updatePaymentStatus);
router.put("/:id/cancel", cancelOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
