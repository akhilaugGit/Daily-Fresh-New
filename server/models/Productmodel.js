const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['fish', 'poultry'],  // Dropdown with options
        required: true 
    },
    subcategory: { type: String, required: true },  // Text field for fish or poultry types
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
