const Product = require("../models/Productmodel");

exports.getRecommendedProducts = async (req, res) => {
    try {
        const { preferences } = req.body;
        const selectedPreferences = Object.entries(preferences)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        // Build the query to match products with selected taste profiles
        const query = {
            isDisabled: false, // Only get active products
            $and: selectedPreferences.map(pref => ({
                [`tasteProfile.${pref}`]: true
            }))
        };

        // Get matching products from database
        const dbProducts = await Product.find(query);

        // Calculate match percentage and sort products
        const recommendedProducts = dbProducts
            .map(product => {
                // Count how many preferences match
                const matchCount = selectedPreferences.filter(pref => 
                    product.tasteProfile[pref] === true
                ).length;

                const matchPercentage = (matchCount / selectedPreferences.length) * 100;

                return {
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    category: product.category,
                    stock: product.stock,
                    offer: product.offer,
                    matchPercentage: Math.round(matchPercentage)
                };
            })
            .filter(product => product.matchPercentage > 0) // Only include products with matches
            .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort by match percentage

        res.status(200).json({
            success: true,
            message: "Recommended products fetched successfully",
            data: recommendedProducts
        });

    } catch (error) {
        console.error('Error in taste profile recommendation:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching recommendations",
            error: error.message
        });
    }
};
3 