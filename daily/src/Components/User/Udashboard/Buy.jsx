import React from 'react';
import { useLocation } from 'react-router-dom';

const Buy = () => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const handlePayment = async () => {
    try {
      // Call backend to create an order and get order ID
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: totalPrice })
      });

      const data = await response.json();
      const { orderId } = data;

      // Initialize Razorpay options
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key ID
        amount: totalPrice * 100, // Amount in paise
        currency: 'INR',
        name: 'Your Store Name',
        description: 'Thank you for your purchase!',
        order_id: orderId,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Further actions after successful payment, like updating DB or redirecting
        },
        prefill: {
          name: 'Your Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Some Address'
        },
        theme: {
          color: '#3399cc'
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Error in payment: ', error);
      alert('Something went wrong with the payment');
    }
  };

  return (
    <div className="buy-page">
      <h2>Checkout</h2>
      <p>Total Price to Pay: ₹{totalPrice}</p>
      <button onClick={handlePayment}>
        Confirm Purchase
      </button>
    </div>
  );
};

export default Buy;
