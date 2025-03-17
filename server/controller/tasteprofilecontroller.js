const Product = require("../models/Productmodel");
const fs = require('fs');
const path = require('path');

exports.getRecommendedProducts = async (req, res) => {
    try {
        const { preferences } = req.body;
        const selectedPreferences = Object.entries(preferences)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        // Read CSV file
        const csvFilePath = path.join(__dirname, '../../fish_products_data.csv');
        const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

        // Parse CSV manually
        const [headers, ...rows] = fileContent.split('\n');
        const headerArray = headers.split(',');

        // Convert CSV rows to objects
        const records = rows.map(row => {
            const values = row.split(',');
            return headerArray.reduce((obj, header, index) => {
                obj[header.trim()] = values[index]?.trim() || '';
                return obj;
            }, {});
        });

        // Filter products based on selected preferences
        const recommendedProducts = records.filter(product => {
            return selectedPreferences.every(pref => {
                return product[pref]?.toLowerCase() === 'true';
            });
        });

        // Sort by matching characteristics count
        const sortedProducts = recommendedProducts.sort((a, b) => {
            const aMatches = selectedPreferences.filter(pref => a[pref]?.toLowerCase() === 'true').length;
            const bMatches = selectedPreferences.filter(pref => b[pref]?.toLowerCase() === 'true').length;
            return bMatches - aMatches;
        });

        // Add match percentage
        const productsWithScore = sortedProducts.map(product => {
            const matchCount = selectedPreferences.filter(pref => product[pref]?.toLowerCase() === 'true').length;
            const matchPercentage = (matchCount / selectedPreferences.length) * 100;
            return {
                ...product,
                matchPercentage: Math.round(matchPercentage)
            };
        });

        res.status(200).json({
            success: true,
            message: "Recommended products fetched successfully",
            data: productsWithScore
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