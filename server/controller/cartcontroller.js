const Cart = require('../models/Cartmodel');
const Product = require('../models/Productmodel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId correctly

// Add item to cart
const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    console.log("Add to Cart request received:", { userId, productId, quantity }); // Debugging log

    try {
        // Find the cart based on userId
        let cart = await Cart.findOne({ userId });

        if (cart) {
            console.log("Cart found for user:", userId);

            // Check if the product is already in the cart
            const itemIndex = cart.products.findIndex(p => p.productId == productId);
            
            if (itemIndex > -1) {
                // Product already exists in the cart, update the quantity
                console.log("Product already in cart. Updating quantity.");
                cart.products[itemIndex].quantity += quantity;
            } else {
                // Product not in cart, add as new product
                console.log("Product not in cart. Adding new product.");
                cart.products.push({ productId, quantity });
            }
        } else {
            // No cart exists for the user, create a new cart
            console.log("No cart found for user. Creating new cart.");
            cart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
        }

        // Save the updated cart
        await cart.save();
        console.log("Cart updated successfully:", cart); // Debugging log for the saved cart
        res.status(200).json(cart); // Return the updated cart
    } catch (error) {
        console.error("Error adding item to cart:", error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
};

// View cart items
const viewCart = async (req, res) => {
    try {
        const userId = req.identifier;  // Ensure this matches the middleware
        console.log("User ID from token:", userId);

        // Fetch the cart based on userId
        const cart = await Cart.findOne({ userId });

        // If no cart is found, return a 404 error
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Populate the productId field with details from the Product model
        await cart.populate({
            path: 'products.productId',
            model: 'Product',
            select: 'name price imageUrl' // Select only the fields you need
        });

        console.log("Cart after population:", cart);

        // Send populated cart
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update item quantity in cart
const updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.identifier; // Get userId from the token
        const { productId, quantity } = req.body;

        // Ensure productId is converted to ObjectId
        const objectId = new ObjectId(productId);

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Update the quantity of the item
        const itemIndex = cart.products.findIndex(item => item.productId && item.productId.equals(objectId));
        if (itemIndex > -1) {
            cart.products[itemIndex].quantity = quantity; // Update quantity
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Recalculate the total price of the cart
        const totalPrice = cart.products.reduce((total, item) => {
            return item.productId ? total + (item.productId.price * item.quantity) : total;
        }, 0);

        // Save the updated cart and total price
        await cart.save();
        cart.totalPrice = totalPrice; // Set the total price in cart

        return res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update cart' });
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Convert productId to ObjectId
        const objectId = new ObjectId(productId); // Instantiate ObjectId correctly

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from the cart
        cart.products = cart.products.filter(item => item.productId && !item.productId.equals(objectId));

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to remove item from cart' });
    }
};

module.exports = { addItemToCart, viewCart, updateCartItemQuantity, removeItemFromCart };
