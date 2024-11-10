const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Razorpay = require("razorpay"); // Razorpay integration
const indexRoutes = require("./routes/indexroutes"); // Import the main routes
const connectDB = require("./config/databse"); // Import your database connection
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Ensure this is set in your .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Payment route
app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });
    res.json({ orderId: order.id });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
});

// Use routes
app.use("/api", indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
