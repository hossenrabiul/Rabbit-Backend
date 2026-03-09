const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  console.log(req.body)
  try {
    const userId = req.user.id; // From auth middleware
    const { productId, quantity = 1 } = req.body;

    // ============ VALIDATION ============
    if (!productId) {
      return res.status(401).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // ============ CHECK PRODUCT ============
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // console.log("product", product);
    // ============ CHECK STOCK ============
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`,
      });
    }

    // ============ FIND OR CREATE CART ============
    let cart = await Cart.findOne({ userId, isActive : true });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }

    // ============ ADD OR UPDATE ITEM ============
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (existingItemIndex > -1) {
      // Item exists - increase quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      console.log(newQuantity);
      // if (product.stock < newQuantity) {
      //   return res.status(400).json({
      //     success: false,
      //     message: `Only ${product.stock} items available. Already have ${cart.items[existingItemIndex].quantity} in cart`,
      //   });
      // }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // New item - add to cart
      cart.items.push({
        productId,
        quantity,
        price: product.price,
      });
    }

    // ============ CALCULATE TOTALS ============
    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    // ============ SAVE CART ============
    await cart.save();

    // ============ POPULATE & RETURN ============
    await cart.populate({
      path: "items.productId",
      select: "name description image category price discountPrice stock",
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error adding to cart",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // ============ FIND CART ============
    let cart = await Cart.findOne({ userId, isActive: true }).populate({
      path: "items.productId",
      select: "name description image category price discountPrice stock",
    });

    // ============ CREATE IF NOT EXISTS ============
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
      await cart.save();
    }

    // ============ RETURN CART ============
    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving cart",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    // ============ VALIDATION ============
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // ============ FIND CART ============
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ============ FIND ITEM ============
    const item = cart.items.find((i) => i._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // ============ CHECK STOCK ============
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`,
      });
    }

    // ============ UPDATE QUANTITY ============
    item.quantity = quantity;

    // ============ RECALCULATE TOTALS ============
    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach((cartItem) => {
      totalItems += cartItem.quantity;
      totalPrice += cartItem.price * cartItem.quantity;
    });

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    // ============ SAVE CART ============
    await cart.save();

    // ============ POPULATE & RETURN ============
    await cart.populate({
      path: "items.productId",
      select: "name description image category price discountPrice stock",
    });

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error updating cart item",
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    // ============ FIND CART ============
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ============ FIND & REMOVE ITEM ============
    const itemIndex = cart.items.findIndex((i) => i._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.items.splice(itemIndex, 1);

    // ============ RECALCULATE TOTALS ============
    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    // ============ SAVE CART ============
    await cart.save();

    // ============ POPULATE & RETURN ============
    await cart.populate({
      path: "items.productId",
      select: "name description image category price discountPrice stock",
    });

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error removing item from cart",
    });
  }
};

exports.deleteAllCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // ============ FIND CART ============
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ============ CLEAR ITEMS ============
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    // ============ SAVE CART ============
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error clearing cart",
    });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    // ============ FIND ALL CARTS ============
    const carts = await Cart.find()
      .populate({
        path: "userId",
        select: "name email",
      })
      .populate({
        path: "items.productId",
        select: "name price",
      });

    res.status(200).json({
      success: true,
      message: "All carts retrieved successfully",
      data: carts,
      count: carts.length,
    });
  } catch (error) {
    console.error("Get all carts error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving carts",
    });
  }
};
