const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { ErrorResponse } = require("../middleware/errorHandler");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const { customer, items, total } = req.body;

  // Validate items
  if (!items || items.length === 0) {
    return next(new ErrorResponse("Please provide order items", 400));
  }

  // Verify product availability and prices
  for (let item of items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      return next(
        new ErrorResponse(`Product ${item.productId} not found`, 404),
      );
    }

    if (product.stock < item.quantity) {
      return next(
        new ErrorResponse(
          `Insufficient stock for ${product.name}. Available: ${product.stock}`,
          400,
        ),
      );
    }
  }

  // Create order
  const order = await Order.create({
    orderNumber: `ORD-${Date.now()}`,
    customer,
    items,
    total,
    paymentStatus: "pending",
    status: "pending",
  });
  const cart = await Cart.findOne({ userId: req.user.id });
  const updateCart = await Cart.findByIdAndUpdate(cart._id, {
    isActive: false,
  });
  // console.log(updateCart);
  // Update product stock
  for (let item of items) {
    await Product.findByIdAndUpdate(
      item.productId,
      { $inc: { stock: -item.quantity } },
      { new: true },
    );
  }

  // Populate order with product details
  await order.populate("items.productId");

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const {
    status,
    paymentStatus,
    page = 1,
    limit = 10,
    sort = "-createdAt",
  } = req.query;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }
  if (req.user.role == "user") {
    filter["customer.email"] = req.user.email;
  }
  
  const pageNum = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const skip = (pageNum - 1) * pageSize;

  const orders = await Order.find(filter)
    .populate("items.productId")
    .sort(sort)
    .skip(skip)
    .limit(pageSize);

  const total = await Order.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    pages: Math.ceil(total / pageSize),
    currentPage: pageNum,
    data: orders,
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("items.productId");

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc    Get order by order number
// @route   GET /api/orders/number/:orderNumber
// @access  Public
exports.getOrderByNumber = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({
    orderNumber: req.params.orderNumber,
  }).populate("items.productId");

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  // Check if status change is valid
  const validStatusTransitions = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["processing", "cancelled"],
    processing: ["shipped"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  if (
    req.body.status &&
    !validStatusTransitions[order.status].includes(req.body.status)
  ) {
    return next(
      new ErrorResponse(
        `Cannot change status from ${order.status} to ${req.body.status}`,
        400,
      ),
    );
  }

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("items.productId");

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Public
exports.cancelOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  if (order.status !== "pending" && order.status !== "confirmed") {
    return next(
      new ErrorResponse(`Cannot cancel order with status ${order.status}`, 400),
    );
  }

  // Restore product stock
  for (let item of order.items) {
    await Product.findByIdAndUpdate(
      item.productId,
      { $inc: { stock: item.quantity } },
      { new: true },
    );
  }

  order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: "cancelled" },
    { new: true },
  ).populate("items.productId");

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    data: {},
  });
});

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private/Admin
exports.getOrderStats = asyncHandler(async (req, res, next) => {
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$pricing.total" },
      },
    },
  ]);

  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const ordersByPaymentStatus = await Order.aggregate([
    {
      $group: {
        _id: "$paymentStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByStatus,
      ordersByPaymentStatus,
    },
  });
});

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private
exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { paymentStatus, transactionId } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      paymentStatus,
      transactionId,
    },
    { new: true, runValidators: true },
  ).populate("items.productId");

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Payment status updated successfully",
    data: order,
  });
});
