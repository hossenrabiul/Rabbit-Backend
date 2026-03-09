const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const connectDB = require("../config/database");

dotenv.config();

const seedProducts = [
  {
    name: "pakistani inspired 2ps 💁‍♀️",
    dupatta: "",
    pant: "shiny cotton",
    kamiz: "kamiz-georjhet with inner",
    price: 1750,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/vnnbWfw/Whats-App-Image-2026-03-05-at-7-12-46-PM-1.jpg",
    images: [
      "https://i.ibb.co.com/yB0997mv/Whats-App-Image-2026-03-05-at-7-12-46-PM.jpg",
      "https://i.ibb.co.com/xtg19zJD/Whats-App-Image-2026-03-05-at-7-12-45-PM-1.jpg",
      "https://i.ibb.co.com/N61Fg9RG/Whats-App-Image-2026-03-05-at-7-12-45-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    // size: "size-Free 46/48",
  },
  {
    name: "pakistani inspired 3ps 💁‍♀️",
    dupatta: "Dupatta-Cotton",
    pant: "pant-cotton( unstitched )",
    kamiz: "kamiz-Cotton",
    price: 1550,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/7Jd2hDkN/Whats-App-Image-2026-03-05-at-7-44-31-PM-1.jpg",
    images: [
      "https://i.ibb.co.com/pv7vwXv0/Whats-App-Image-2026-03-05-at-7-44-31-PM.jpg",
      "https://i.ibb.co.com/pv7vwXv0/Whats-App-Image-2026-03-05-at-7-44-31-PM.jpg",
      "https://i.ibb.co.com/xqnbm44r/Whats-App-Image-2026-03-05-at-7-44-32-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "pakistani inspired 3ps 💁‍♀️",
    dupatta: "Dupatta-Cotta",
    pant: "pant-cotton",
    kamiz: "kamiz-Cotton",
    price: 1700,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/9kxZRQ1Y/Whats-App-Image-2026-03-05-at-7-52-52-PM-1.jpg",
    images: [
      "https://i.ibb.co.com/MyM6WtCX/Whats-App-Image-2026-03-05-at-7-52-52-PM.jpg",
      "https://i.ibb.co.com/d4cgPfz2/Whats-App-Image-2026-03-05-at-7-52-49-PM-2.jpg",
      "https://i.ibb.co.com/N2xL7JHh/Whats-App-Image-2026-03-05-at-7-52-50-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "pakistani inspired 2ps 💁‍♀️",
    dupatta: "Dupatta-Cotta",
    pant: "pant-cotton",
    kamiz: "kamiz-Cotton",
    price: 1700,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/PsbQBjMJ/Whats-App-Image-2026-03-05-at-7-56-57-PM-2.jpg",
    images: [
      "https://i.ibb.co.com/Hfd4f6pk/Whats-App-Image-2026-03-05-at-7-56-57-PM-1.jpg",
      "https://i.ibb.co.com/TDvX1ZW3/Whats-App-Image-2026-03-05-at-7-56-58-PM.jpg",
      "https://i.ibb.co.com/5hWVbCGm/Whats-App-Image-2026-03-05-at-7-56-59-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "pakistani inspired 3ps",
    kamiz: "kamiz-Cotton with heavy work",
    pant: "pant-cotton",
    dupatta: "Dupatta-shiny cotton",
    price: 2550,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/twGBSrxq/Whats-App-Image-2026-03-05-at-8-14-54-PM.jpg",
    images: [
      "https://i.ibb.co.com/rGFYbKC6/Whats-App-Image-2026-03-05-at-8-14-53-PM-1.jpg",
      "https://i.ibb.co.com/nq4DHRX0/Whats-App-Image-2026-03-05-at-8-14-53-PM.jpg",
      "https://i.ibb.co.com/4gVwpWTg/Whats-App-Image-2026-03-05-at-8-22-18-PM-2.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "jamdani 2ps",
    kamiz: "kamiz-Cotton with jamdani work",
    pant: "",
    dupatta: "Dupatta-cotta",
    price: 1600,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/cctXRL3c/Whats-App-Image-2026-03-05-at-10-56-56-PM.jpg",
    images: [
      "https://i.ibb.co.com/BHCc4SfW/Whats-App-Image-2026-03-05-at-10-56-56-PM-2.jpg",
      "https://i.ibb.co.com/cctXRL3c/Whats-App-Image-2026-03-05-at-10-56-56-PM.jpg",
      "https://i.ibb.co.com/XZTspQNf/Whats-App-Image-2026-03-05-at-10-56-55-PM-1.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "Pakistani inspired 3ps",
    kamiz: "kamiz- shiny silk with cotton inner",
    pant: "pant-cotton",
    dupatta: "dupatta-soft moshlin",
    price: 2350,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/gLvHGvXY/Whats-App-Image-2026-03-05-at-10-59-45-PM.jpg",
    images: [],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free",
  },
  {
    name: "pakistani inspired 2ps",
    kamiz: " kamiz-cotton",
    pant: "",
    dupatta: "dupatta-cotta",
    price: 1700,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/fVC1Gtdg/Whats-App-Image-2026-03-05-at-10-55-33-PM.jpg",
    images: [],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free",
  },
  {
    name: "pakistani inspired 3ps",
    kamiz: "kamiz-cotton",
    pant: "",
    dupatta: "dupatta-soft moslin",
    price: 2250,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/WWNJ9Z32/Whats-App-Image-2026-03-05-at-10-57-32-PM.jpg",
    images: [
      "https://i.ibb.co.com/zhTzd081/Whats-App-Image-2026-03-05-at-10-57-32-PM-1.jpg",
      "https://i.ibb.co.com/vxW8RNc0/Whats-App-Image-2026-03-05-at-8-23-09-PM.jpg",
      "https://i.ibb.co.com/tTHSd0Vj/Whats-App-Image-2026-03-05-at-8-23-08-PM-1.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free",
  },
  {
    name: "jamdani 2ps",
    kamiz: "kamiz-Cotton with jamdani work",
    pant: "",
    dupatta: "dupatta-cotta",
    price: 1600,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/Cpy9rjHY/Whats-App-Image-2026-03-05-at-10-36-45-PM.jpg",
    images: [
      "https://i.ibb.co.com/jvBM8j4p/Whats-App-Image-2026-03-05-at-10-36-44-PM.jpg",
      "https://i.ibb.co.com/67MC5KFm/Whats-App-Image-2026-03-05-at-10-36-45-PM-1.jpg",
      "https://i.ibb.co.com/twC6h77M/Whats-App-Image-2026-03-05-at-10-36-46-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "pakistani inspired 3ps",
    kamiz: "kamiz-Cotton with heavy work",
    pant: "pant-cotton",
    dupatta: "dupatta-cotta",
    price: 2050,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/8nBkBLWp/Whats-App-Image-2026-03-05-at-10-35-10-PM.jpg",
    images: [],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "pakistani inspired 2ps",
    kamiz: "kamiz-Cotton",
    pant: "",
    dupatta: "dupatta-cotta",
    price: 1500,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/k6Vw4Lrq/Whats-App-Image-2026-03-05-at-10-33-52-PM.jpg",
    images: [],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free",
  },
  {
    name: "pakistani inspired 2ps",
    kamiz: "",
    pant: "",
    dupatta: "",
    price: 1600,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/svqTRJqJ/Whats-App-Image-2026-03-05-at-8-25-25-PM.jpg",
    images: [
      "https://i.ibb.co.com/tTHSd0Vj/Whats-App-Image-2026-03-05-at-8-23-08-PM-1.jpg",
      "https://i.ibb.co.com/fzFVv6pX/Whats-App-Image-2026-03-05-at-8-23-08-PM.jpg",
      "https://i.ibb.co.com/vxW8RNc0/Whats-App-Image-2026-03-05-at-8-23-09-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    // size: "size-Free",
  },
  {
    name: "Pakistani inspired 3ps",
    kamiz: "Kamiz-Cotton",
    pant: "Pant-Cotton( Unstitched )",
    dupatta: "Dupatta-Cotton",
    price: 1600,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/zVhrwj0w/Whats-App-Image-2026-03-08-at-5-28-18-PM.jpg",
    images: [
      "https://i.ibb.co.com/7x4ptzvc/Whats-App-Image-2026-03-08-at-5-28-19-PM-1.jpg",
      "https://i.ibb.co.com/tp6S9ZT1/Whats-App-Image-2026-03-08-at-5-28-19-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free",
  },
  {
    name: "Pakistani inspired 2ps",
    kamiz: "Kamiz-Cotton",
    pant: "",
    dupatta: "Dupatta-Cotta",
    price: 1200,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/b55hD4JQ/Whats-App-Image-2026-03-08-at-6-53-54-PM-1.jpg",
    images: [
      "https://i.ibb.co.com/0jx9S6Jk/Whats-App-Image-2026-03-08-at-6-53-54-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free",
  },
  {
    name: "Pakistani inspired 3ps",
    kamiz: "",
    pant: "",
    dupatta: "",
    price: 1550,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/XZRXpPLt/Whats-App-Image-2026-03-09-at-1-22-47-AM.jpg",

    images: [
      "https://i.ibb.co.com/zkhS190/Whats-App-Image-2026-03-05-at-7-57-48-PM.jpg",
      "https://i.ibb.co.com/hJTjQwpP/Whats-App-Image-2026-03-05-at-7-57-48-PM-1.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "Pakistani inspired 3ps",
    kamiz: "Kamiz-Cotton",
    pant: "Pant-Cotton",
    dupatta: "Dupatta-Cotta",
    price: 1700,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/PsbQBjMJ/Whats-App-Image-2026-03-05-at-7-56-57-PM-2.jpg",
    images: [
      "https://i.ibb.co.com/Hfd4f6pk/Whats-App-Image-2026-03-05-at-7-56-57-PM-1.jpg",
      "https://i.ibb.co.com/TDvX1ZW3/Whats-App-Image-2026-03-05-at-7-56-58-PM.jpg",
      "https://i.ibb.co.com/5hWVbCGm/Whats-App-Image-2026-03-05-at-7-56-59-PM.jpg",
    ],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    size: "size-Free 46/48",
  },
  {
    name: "Pakistani inspired 3ps",
    kamiz: "Kamiz-soft silk",
    pant: "pant-soft silk( unstitched )",
    dupatta: "Dupatta-Cotta",
    price: 1400,
    // discountPrice: 29.99,
    // stock: 38,
    // category: "Toys",
    image:
      "https://i.ibb.co.com/Y4QjHSq5/Whats-App-Image-2026-03-08-at-10-35-40-PM.jpg",
    images: [],
    rating: 4.4,
    reviews: 234,
    tags: ["toys", "collectible", "action-figures"],
    // size: "size-Free 46/48",
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
