import React from 'react';
import { useLocation } from 'react-router-dom';

const Buy = () => {
  // Get the state passed from the Cart component, which includes the total price
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };  // Default to 0 if state is missing

  return (
    <div className="buy-page">
      <h2>Checkout</h2>
      <p>Total Price to Pay: ₹{totalPrice}</p>
      <button onClick={() => alert('Order placed successfully!')}>
        Confirm Purchase
      </button>
    </div>
  );
};

export default Buy;
