const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
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

// it's a test commit by anandhu.company
//? it's a test commit by anandhu.personal
