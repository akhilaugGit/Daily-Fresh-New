const Cart = require('../models/cartModel');
const Product = require('../models/Productmodel');
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

        // Populate the productId field in products array
        await cart.populate('products.productId'); // Directly use populate

        console.log("Cart after population:", cart);

        // Send populated cart
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: error.message });
    }
};


// Update item quantity in cart
const updateItemQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        const itemIndex = cart.products.findIndex(p => p.productId == productId);

        if (itemIndex > -1) {
            cart.products[itemIndex].quantity = quantity;
            await cart.save();
            return res.status(200).json(cart);
        }

        res.status(404).json({ message: 'Product not found in cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        cart.products = cart.products.filter(p => p.productId != productId);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addItemToCart, viewCart, updateItemQuantity, removeItemFromCart };
