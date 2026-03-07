const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const connectDB = require("../config/database");

dotenv.config();

const seedProducts = [
  {
    name: "pakistani inspired 3psmaterial💁‍♀️",
    description: "kamiz-Cotton with heavy work.",
    pant: "pant- cotton",
    quality: "Dupatta-cotta",
    price: 2050,
    discountPrice: 29.99,
    stock: 38,
    category: "Toys",
    image:
      "https://i.ibb.co.com/B2jt4svx/Whats-App-Image-2026-03-05-at-10-36-45-PM.jpg",
    images: [
      "https://i.ibb.co.com/B2jt4svx/Whats-App-Image-2026-03-05-at-10-36-45-PM.jpg",
      "https://i.ibb.co.com/B2jt4svx/Whats-App-Image-2026-03-05-at-10-36-45-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "pakostani inspired 2ps",
    description: "pakostani inspired 2ps",
    pant: "kamiz- cotton",
    quality: "dupatta-soft moslin",
    price: 2250,
    discountPrice: 29.99,
    stock: 38,
    category: "Toys",
    image:
      "https://i.ibb.co.com/TBGZpB8h/Whats-App-Image-2026-03-05-at-10-59-45-PM.jpg",
    images: [
      "https://i.ibb.co.com/TBGZpB8h/Whats-App-Image-2026-03-05-at-10-59-45-PM.jpg",
      "https://i.ibb.co.com/TBGZpB8h/Whats-App-Image-2026-03-05-at-10-59-45-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "Size-free",
  },
  {
    name: "jamdani 2psmaterial💁‍♀️",
    description: "kamiz-Cotton with jamdani work",
    pant: "",
    quality: "Dupatta-cotta",
    price: 1600,
    discountPrice: 29.99,
    stock: 38,
    category: "Toys",
    image:
      "https://i.ibb.co.com/0pbhGYXQ/Whats-App-Image-2026-03-05-at-10-57-32-PM.jpg",
    images: [
      "https://i.ibb.co.com/0pbhGYXQ/Whats-App-Image-2026-03-05-at-10-57-32-PM.jpg",
      "https://i.ibb.co.com/0pbhGYXQ/Whats-App-Image-2026-03-05-at-10-57-32-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "pakistani inspired 3psmaterial💁‍♀️",
    description: "",
    pant: "pant- cotton",
    quality: "Dupatta-Cotta",
    price: 1700,
    discountPrice: 29.99,
    stock: 38,
    category: "Toys",
    image:
      "https://i.ibb.co.com/nNBcj51C/Whats-App-Image-2026-03-05-at-7-52-48-PM.jpg",
    images: [
      "https://i.ibb.co.com/nNBcj51C/Whats-App-Image-2026-03-05-at-7-52-48-PM.jpg",
      "https://i.ibb.co.com/nNBcj51C/Whats-App-Image-2026-03-05-at-7-52-48-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
];

const runSeed = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert seed products
    const createdProducts = await Product.insertMany(seedProducts);
    console.log(`✓ Seeded ${createdProducts.length} products successfully!`);

    // Display sample products
    console.log("\n📦 Sample Products:");
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

runSeed();
