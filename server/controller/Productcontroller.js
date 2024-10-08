const Product = require('../models/Productmodel');

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, category, subcategory } = req.body;
        console.log(imageUrl);
        // Ensure the category is either 'fish' or 'poultry'
        if (!['fish', 'poultry'].includes(category)) {
            return res.status(400).json({ message: 'Invalid category. Must be fish or poultry.' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl,
            category,      // Category dropdown field
            subcategory    // Subcategory text field
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

// Edit an existing product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageUrl, category, subcategory } = req.body;

        // Ensure the category is either 'fish' or 'poultry'
        if (!['fish', 'poultry'].includes(category)) {
            return res.status(400).json({ message: 'Invalid category. Must be fish or poultry.' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, imageUrl, category, subcategory },
            { new: true }  // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = {
    addProduct,
    editProduct,
    deleteProduct
};
