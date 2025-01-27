const express = require("express");
const router = express.Router();

// Import controller
const { getRecommendedProducts } = require("../controller/tasteprofilecontroller");

// Define routes
router.post("/recommendations", getRecommendedProducts);

// Export router
module.exports = router;
