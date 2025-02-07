const Product = require("../models/Productmodel");

exports.getRecommendedProducts = async (req, res) => {
  try {
    const { preferences } = req.body; // User's selected preferences from the frontend

    // Build the query for matching taste profiles
    const query = {
      $and: Object.keys(preferences)
        .filter((key) => preferences[key]) // Only include true preferences
        .map((key) => ({ [`tasteProfile.${key}`]: true })), // Match fields in the product model
    };

    // Find products matching the query
    const matchingProducts = await Product.find(query);

    res.status(200).json({
      success: true,
      message: "Recommended products fetched successfully",
      data: matchingProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching recommended products",
      error: error.message,
    });
  }
};
3 