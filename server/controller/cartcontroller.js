const CartItem = require('../models/Cartmodel');

// Add an item to the cart
const addItem = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    const cartItem = new CartItem({
        name,
        description,
        price,
        imageUrl,
    });
    try {
        await cartItem.save();
        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};

// Get all items in the cart
const getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items' });
    }
};

// Get a specific cart item by ID
const getCartItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await CartItem.findById(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart item by ID' });
    }
};

// Delete an item from the cart
const deleteItemFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await CartItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart' });
    }
};

// Export all functions
module.exports = {
    addItem,
    getCartItems,
    getCartItemById, // Ensure this is included
    deleteItemFromCart
};
