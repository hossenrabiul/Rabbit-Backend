const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    customer: {
      firstName: {
        type: String,
        required: [true, "Customer name is required"],
      },
      email: {
        type: String,
        required: [true, "Customer email is required"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      number: {
        type: String,
        required: [true, "Customer phone is required"],
      },
      address: {
        type: String,
        required: [true, "Customer address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      postalCode: {
        type: String,
        required: [true, "PostalCode is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "net_banking", "wallet", "cod"],
      default: "cod",
    },
    transactionId: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    trackingNumber: {
      type: String,
      default: null,
    },
    estimatedDelivery: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Generate order number before saving
// orderSchema.pre("save", function (next) {
//   if (!this.orderNumber) {
//     this.orderNumber = `ORD-${Date.now()}`;
//   }
//   next();
// });

module.exports = mongoose.model("Order", orderSchema);
