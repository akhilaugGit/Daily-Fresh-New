import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Adjusted import
import axios from 'axios';
import './UproductCard.css'

const ProductCard = ({ productId, imageUrl, name, description, price, category,offer,addtoCart }) => {
    const navigate = useNavigate();
    console.log(productId);
    // Function to extract userId from token
    const getUserIdFromToken = async () => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (token) {
            const decodedToken = await jwtDecode(token);
            
            
            return decodedToken.id; // Assuming the token has userId as a property
        }
        return null;
    };

    const handleAddToCart = async () => {     
        try {

            const userId = await getUserIdFromToken(); 
            await console.log(`userid ${userId}`);

        if (!userId) {
            console.error('User is not authenticated');
            return;
        }
            // Send a POST request to add the product to the cart
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
                userId,  // Pass the extracted userId in the request body
                productId,  // Pass the productId in the request body
                quantity: 1 // Default quantity set to 1, modify as needed
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
        
            <img src={`${import.meta.env.VITE_BACKEND_URL}${imageUrl}`} alt={name} className="product-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: ₹{price}</p>
            <p className="offer">Offer: {offer}</p>

            <button
                id={`add-to-cart-${productId}`}
                onClick={handleAddToCart}
                style={{
                    backgroundColor: "#389246",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    marginTop: "10px",
                    position: "relative",
                    zIndex: "1"
                }}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
