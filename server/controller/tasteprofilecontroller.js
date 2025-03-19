const Product = require("../models/Productmodel");

exports.getRecommendedProducts = async (req, res) => {
    try {
        const { preferences, k = 5 } = req.body; // k is the number of nearest neighbors to consider
        const selectedPreferences = Object.entries(preferences)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        // If no preferences selected, return early
        if (selectedPreferences.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Please select at least one taste preference",
                data: []
            });
        }

        // Get all active fish products only
        const allProducts = await Product.find({ 
            isDisabled: false,
            category: "fish"  // Filter to only include fish products
        });

        // If no fish products found, return early
        if (allProducts.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No fish products found in our database",
                data: []
            });
        }

        // Convert user preferences to a feature vector
        const userVector = createFeatureVector(preferences);

        // Calculate distances and find nearest neighbors
        const productsWithDistances = allProducts.map(product => {
            // Convert product taste profile to feature vector
            const productVector = createFeatureVector(product.tasteProfile);
            
            // Calculate Euclidean distance between user preferences and product
            const distance = calculateEuclideanDistance(userVector, productVector);
            
            // Calculate similarity score (inverse of distance, normalized)
            const similarityScore = 100 / (1 + distance);
            
            // Calculate direct match percentage
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
                category: product.category, // Should always be "fish" based on our filter
                stock: product.stock,
                offer: product.offer,
                distance,
                similarityScore: Math.round(similarityScore),
                matchPercentage: Math.round(matchPercentage),
                matchCount,
                isExactMatch: matchPercentage >= 60
            };
        });

        // Sort products by distance (ascending) - KNN approach
        const sortedProducts = productsWithDistances.sort((a, b) => a.distance - b.distance);
        
        // Select top k products as nearest neighbors
        const nearestNeighbors = sortedProducts.slice(0, k);
        
        // Also include products with high direct match percentage that might not be in the top k
        const exactMatches = productsWithDistances
            .filter(p => p.isExactMatch && !nearestNeighbors.some(n => n._id.equals(p._id)))
            .slice(0, 5); // Limit to 5 additional exact matches
        
        // Combine nearest neighbors and exact matches
        const recommendedProducts = [...nearestNeighbors, ...exactMatches];
        
        // Final sort by similarity score and match percentage
        recommendedProducts.sort((a, b) => {
            if (Math.abs(a.similarityScore - b.similarityScore) > 15) {
                return b.similarityScore - a.similarityScore;
            }
            // If similarity scores are close, prioritize exact matches
            if (a.isExactMatch && !b.isExactMatch) return -1;
            if (!a.isExactMatch && b.isExactMatch) return 1;
            return b.matchPercentage - a.matchPercentage;
        });

        // Return appropriate message based on results
        if (recommendedProducts.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No fish products found matching your taste preferences. Try selecting different combinations.",
                data: []
            });
        }

        // Group products by match type for message
        const knnMatches = nearestNeighbors.length;
        const directMatches = exactMatches.length;

        res.status(200).json({
            success: true,
            message: `Found ${knnMatches} fish products as nearest neighbors and ${directMatches} additional exact matches`,
            data: recommendedProducts.map(product => ({
                ...product,
                matchType: product.isExactMatch ? 'Exact Match' : 'Similar Taste',
                // Include distance and similarity scores for transparency
                distanceScore: Math.round(product.distance * 100) / 100,
                similarityScore: product.similarityScore
            }))
        });

    } catch (error) {
        console.error('Error in fish taste profile recommendation:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching fish recommendations",
            error: error.message
        });
    }
};

// Helper function to create a feature vector from taste preferences
function createFeatureVector(preferences) {
    // Define all possible taste attributes
    const tasteAttributes = [
        'sweetness', 'tenderness', 'saltiness', 'fishiness', 
        'mineral', 'texture', 'oiliness', 'acidity', 'metallic'
    ];
    
    // Additional weight for similar tastes
    const similarityGroups = [
        ['sweetness', 'tenderness'],
        ['saltiness', 'fishiness', 'mineral'],
        ['texture', 'oiliness'],
        ['acidity', 'metallic']
    ];
    
    // Create vector with binary values for each taste
    return tasteAttributes.map(attr => {
        // Direct match: 1 if preference exists and is true, 0 otherwise
        const directMatch = preferences[attr] === true ? 1 : 0;
        
        // Similarity boost: add partial weight for similar tastes
        let similarityBoost = 0;
        if (directMatch === 0) {
            // Find if this attribute has similar tastes that are preferred
            const group = similarityGroups.find(g => g.includes(attr));
            if (group) {
                const similarTastes = group.filter(t => t !== attr);
                const hasSimilarPreference = similarTastes.some(t => preferences[t] === true);
                if (hasSimilarPreference) {
                    similarityBoost = 0.5; // Partial weight for similar tastes
                }
            }
        }
        
        return directMatch + similarityBoost;
    });
}

// Euclidean distance calculation between two feature vectors
function calculateEuclideanDistance(vector1, vector2) {
    if (vector1.length !== vector2.length) {
        throw new Error('Vectors must have the same length');
    }
    
    return Math.sqrt(
        vector1.reduce((sum, value, index) => {
            const diff = value - vector2[index];
            return sum + (diff * diff);
        }, 0)
    );
}