const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    kamiz: {
      type: String,
      // required: [true, 'Please add a product description'],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    pant: {
      type: String,
    },
    dupatta: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please add a product price"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      default: null,
      min: [0, "Discount price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "Electronics",
        "Fashion",
        "Home",
        "Sports",
        "Books",
        "Toys",
        "Other",
      ],
      default: "Other",
    },
    image: {
      type: String,
      required: [true, "Please add a product image URL"],
    },
    images: [
      {
        type: String,
      },
    ],
    size: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    reviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for search
productSchema.index({ name: "text", description: "text", category: 1 });

module.exports = mongoose.model("Product", productSchema);
