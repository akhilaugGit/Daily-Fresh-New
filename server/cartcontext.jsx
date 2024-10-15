import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};

// Cart Provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) => 
            prevItems.map(item => item._id === id ? { ...item, quantity } : item)
        );
    };

    const totalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};
