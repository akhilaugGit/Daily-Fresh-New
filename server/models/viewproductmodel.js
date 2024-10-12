const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Product', productSchema);
