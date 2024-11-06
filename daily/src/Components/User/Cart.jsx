import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';  // Adjusted import

import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState({ products: [] }); // Default empty cart products array
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch token from localStorage
  const token = localStorage.getItem('token');

  // Fetch the cart data from the backend
  const fetchCart = async () => {
    try {
      if (!token) {
        console.error('No token found, unable to fetch cart');
        return;
      }

      // Make a request with the token in the Authorization header
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/view`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the request
        },
      });

      // If response has cart data, update state and calculate total price
      if (response.data) {
        console.log(response.data);
        setCart(response.data);
        calculateTotalPrice(response.data.products);
      } else {
        setCart({ products: [] }); // If no cart, set an empty cart
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ products: [] }); // Set empty cart on error
    }
  };

  // Calculate total price based on products in the cart
  const calculateTotalPrice = (products) => {
    const total = products.reduce((sum, product) => {
      if (product.productId) { // Add a safety check to ensure productId exists
        return sum + product.productId.price * product.quantity;
      }
      return sum; // If productId is missing, skip it
    }, 0);
    setTotalPrice(total); // Set the total price state
  };

  // Update the quantity of an item in the cart
  const updateQuantity = async (productId, quantity) => {
    try {
      if (!token) return;

      // Make a PUT request to update the quantity of a specific product
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the request
          },
        }
      );
      fetchCart(); // Refetch cart data after update
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const getUserIdFromToken = async () => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
        const decodedToken = await jwtDecode(token);
        
        
        return decodedToken.id; // Assuming the token has userId as a property
    }
    return null;
};
  const removeItem = async (productId) => {
    try {
      const userId = await getUserIdFromToken(); // Extract userId from token
      if (!token || !userId) return;
  
      // Make a DELETE request to remove the product
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the request
        },
        data: { userId, productId }, // Send both userId and productId in the request body
      });
  
      // Refetch cart after removal
      fetchCart(); 
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };
  


  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);
 

const handleBuy = () => {
  navigate('/buy', { state: { totalPrice } });  // Pass totalPrice to Buy component
};
const handleUdashboard = () => {
  navigate('/udashboard');  // Pass totalPrice to Buy component
};
  return (
    
   
    <div className="cart">
     
    <button onClick={handleUdashboard}>
    ⬅️Back
      </button>

      <h2>Your Cart</h2>
      {cart.products.length > 0 ? (
        <>
          {cart.products.map((product) => (
            product.productId && ( // Only render if productId exists
              <div key={product.productId._id} className="cart-item">
                <img src={product.productId.imageUrl} alt={product.productId.name} />

                
                <h3>{product.productId.name}</h3>
                <p>Price: ₹{product.productId.price}</p>
                <p>Quantity: 
  <input
    type="number"
    value={product.quantity}
    onChange={(e) => {
      const value = parseInt(e.target.value);
      if (value >= 1 && value <= 10) {
        updateQuantity(product.productId._id, value);  // Only update if the value is within the valid range
      }
    }}
    min="1"
    max="10"
  />
</p>

                <button onClick={() => removeItem(product.productId._id)}>Remove</button>
              </div>
            )
          ))}
          <h3>Total Price: ₹{totalPrice}</h3>
          <button onClick={handleBuy}>
                Buy
            </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
