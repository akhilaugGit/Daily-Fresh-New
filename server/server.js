const express = require('express');
const app = express();
const cors = require('cors');
const indexRoutes = require('./routes/indexroutes');  // Import the main routes
const connectDB = require('./config/databse');  // Import your database connection
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api', indexRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
