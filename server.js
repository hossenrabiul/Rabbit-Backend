const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// ==================== MIDDLEWARE ====================

// Request logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "https://rabbit-frontend-hz1jhiu3x-rabiul-hosens-projects.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// ==================== ROUTES ====================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/cart/order", orderRoutes);


// Root endpoint
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to E-Commerce API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      orders: "/api/orders",
      health: "/api/health",
    },
  });
});

// ==================== 404 HANDLER ====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ==================== ERROR HANDLER ====================

app.use(errorHandler);

// ==================== SERVER STARTUP ====================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ==================== GRACEFUL SHUTDOWN ====================

// process.on('unhandledRejection', (err, promise) => {
//   console.error(`❌ Error: ${err.message}`);
//   server.close(() => process.exit(1));
// });

// process.on('SIGTERM', () => {
//   console.log('📍 SIGTERM received. Shutting down gracefully...');
//   server.close(() => {
//     console.log('✓ Server closed');
//     process.exit(0);
//   });
// });

const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║  🛍️  E-Commerce API Server Started 🛍️       ║
║                                              ║
║  📊 Port: ${PORT}                            ║
║  🔧 Environment: ${NODE_ENV}                 ║
║  ⏰ Time: ${new Date().toLocaleString()}     ║
║                                              ║
║  📌 API Base URL: http://localhost:${PORT}/api║
║  ✓ Database: Connected                      ║
║                                              ║
╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
