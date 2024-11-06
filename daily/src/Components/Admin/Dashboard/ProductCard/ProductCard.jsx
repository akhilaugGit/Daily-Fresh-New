import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Adjusted import
import axios from 'axios';
import '../ProductTable/ProductTable.css';

const ProductCard = ({ productId, imageUrl, name, description, price, category,stock }) => {
    const navigate = useNavigate();

    // Function to extract userId from token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (token) {
            const decodedToken = jwtDecode(token);
            
            return decodedToken.userId; // Assuming the token has userId as a property
        }
        return null;
    };

    const handleAddToCart = async () => {     
        try {

            const userId = getUserIdFromToken(); 
            await console.log("hiiiiiiiiii");

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
        <tr className="product-row">
        <td>{name}</td>
        <td>{category}</td>
        <td>{stock}</td>
    </tr>
    );
};

export default ProductCard;
