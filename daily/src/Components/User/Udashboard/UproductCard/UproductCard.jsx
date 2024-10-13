import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UproductCard.css';

const ProductCard = ({ imageUrl, name, description, price, category }) => {
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        try {
            // Send a POST request to add the product to the cart
            const response = await axios.post('http://localhost:3001/api/cart/add', {
                name,
                description,
                price,
                imageUrl
            });
            console.log('Item added to cart:', response.data);

            // Navigate to the cart page after adding the item
            navigate('/cart');
        } catch (error) {
            console.error('Error adding item to cart', error);
        }
    };

    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
