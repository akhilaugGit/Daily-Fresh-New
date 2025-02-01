import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Buy = () => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };
  const navigate = useNavigate(); // Initialize useNavigate

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
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
    if (!selectedLocation) {
      setError('Please select a location.');
      return false;
    }
    setError('');
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3001/api/create-order', {
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
          location: selectedLocation,
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

  const handleCart = () => {
    navigate('/cart'); // Pass totalPrice to Buy component
  };

  return (
    <div className="buy-page" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>Checkout</h2>
      <button onClick={handleCart}>⬅️Back</button>
      <p>Total Price to Pay: ₹{totalPrice}</p>

      <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => {
            if (/^\d{0,10}$/.test(e.target.value)) {
              setPhone(e.target.value);
            }
          }}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />

        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            height: '100px',
          }}
        />

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          <option value="">Select your location</option>
          <option value="Kochi">Kochi</option>
          <option value="Kozhikode">Kozhikode</option>
          <option value="Thiruvananthapuram">Thiruvananthapuram</option>
          <option value="Kottayam">Kottayam</option>
        </select>

        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

        <button
          onClick={handlePayment}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3399cc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default Buy;
