import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios'; // For API requests

const Cart = ({ productId }) => {  // Assuming productId is passed as a prop
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch cart items from the backend
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cart`);
                console.log('Fetched Cart Items:', response.data);  // Debugging line
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items', error);
                setLoading(false);
            }
        };
        
        if (productId) {
            fetchCartItems();
        }
    }, [productId]); // Re-fetch when productId changes

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {loading ? (
                <p>Loading...</p>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div className="cart-item" key={item._id}>
                                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <h3>Total Price: ₹{totalPrice}</h3>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
