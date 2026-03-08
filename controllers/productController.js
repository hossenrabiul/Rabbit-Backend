const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { ErrorResponse } = require("../middleware/errorHandler");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const { category, search, page = 1, limit, sort = "-createdAt" } = req.query;
  // console.log(req.query)
  // Build filter object
  const filter = { isActive: true };

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Pagination
  const pageNum = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const skip = (pageNum - 1) * pageSize;
  // console.log(skip, limit);
  // Execute query
  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(pageSize);

  const total = await Product.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pages: Math.ceil(total / pageSize),
    currentPage: pageNum,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: {},
  });
});

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
exports.getProductsByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 12 } = req.query;

  const pageNum = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const skip = (pageNum - 1) * pageSize;

  const products = await Product.find({ category, isActive: true })
    .skip(skip)
    .limit(pageSize);

  const total = await Product.countDocuments({ category, isActive: true });

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pages: Math.ceil(total / pageSize),
    data: products,
  });
});

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
exports.searchProducts = asyncHandler(async (req, res, next) => {
  const { q, page = 1, limit = 12 } = req.query;

  if (!q) {
    return next(new ErrorResponse("Please provide a search query", 400));
  }

  const pageNum = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const skip = (pageNum - 1) * pageSize;

  const products = await Product.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ],
    isActive: true,
  })
    .skip(skip)
    .limit(pageSize);

  const total = await Product.countDocuments({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ],
    isActive: true,
  });

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pages: Math.ceil(total / pageSize),
    query: q,
    data: products,
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ isActive: true })
    .sort("-rating")
    .limit(8);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Product.distinct("category", { isActive: true });

  res.status(200).json({
    success: true,
    data: categories,
  });
});
