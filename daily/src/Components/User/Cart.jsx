import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'

const Cart = () => {
  const [cart, setCart] = useState({ products: [] }); // Default empty cart products array
  const [totalPrice, setTotalPrice] = useState(0);
  
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
      const response = await axios.get(`http://localhost:3001/api/cart/view`, {
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
      return sum + product.productId.price * product.quantity;
    }, 0);
    setTotalPrice(total); // Set the total price state
  };

  // Update the quantity of an item in the cart
  const updateQuantity = async (productId, quantity) => {
    try {
      if (!token) return;

      // Make a PUT request to update the quantity of a specific product
      await axios.put(
        `http://localhost:3001/api/cart/update`,
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

  // Remove an item from the cart
  const removeItem = async (productId) => {
    try {
      if (!token) return;

      // Make a DELETE request to remove the product
      await axios.delete(`http://localhost:3001/api/cart/remove`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the request
        },
        data: { productId }, // Send product ID in the request body
      });
      fetchCart(); // Refetch cart after removal
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.products.length > 0 ? (
        <>
          {cart.products.map((product) => (
            <div key={product.productId._id} className="cart-item">
            <img src={product.productId.imageUrl}/>
              <h3>{product.productId.name}</h3>
              <p>Price: ${product.productId.price}</p>
              <p>Quantity: 
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => updateQuantity(product.productId._id, parseInt(e.target.value))}
                  min="1"
                />
              </p>
              <button onClick={() => removeItem(product.productId._id)}>Remove</button>
            </div>
          ))}
          <h3>Total Price: ${totalPrice}</h3>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
