import React from 'react';
import './ProductCard.css';

const ProductCard = ({ imageUrl, name, description, price, category }) => {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name}  className="product-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>  {/* Display product category */}
        </div>
    );
};

export default ProductCard;
