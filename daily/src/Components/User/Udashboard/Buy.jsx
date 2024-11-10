// Buy.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Buy = () => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!phone.match(/^\d{10}$/)) {
      setError('Invalid phone number. It should be 10 digits.');
      return false;
    }
    if (address.trim().length < 10) {
      setError('Address should be at least 10 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3001/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const data = await response.json();
      const { orderId } = data;

      const options = {
        key: 'rzp_test_ivyPo2IHVQrSPX', // Replace with your Razorpay key ID
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'Your Store Name',
        description: 'Thank you for your purchase!',
        order_id: orderId,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          contact: phone,
        },
        notes: {
          address: address,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error in payment:', error);
      alert('Something went wrong with the payment');
    }
  };

  return (
    <div className="buy-page">
      <h2>Checkout</h2>
      <p>Total Price to Pay: ₹{totalPrice}</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handlePayment}>Confirm Purchase</button>
      </form>
    </div>
  );
};

export default Buy;
