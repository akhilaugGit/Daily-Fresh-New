import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState({ products: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Fetch token from localStorage
  const token = localStorage.getItem('token');

  // Fetch the cart data from the backend
  const fetchCart = async () => {
    try {
      if (!token) {
        console.error('No token found, unable to fetch cart');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log(response.data);
        setCart(response.data);
        calculateTotalPrice(response.data.products);
      } else {
        setCart({ products: [] });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ products: [] });
    }
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce((sum, product) => {
      if (product.productId) {
        return sum + product.productId.price * product.quantity;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (!token) return;

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const getUserIdFromToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = await jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  };

  const removeItem = async (productId) => {
    try {
      const userId = await getUserIdFromToken();
      if (!token || !userId) return;

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { userId, productId },
      });

      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleBuy = () => {
    navigate('/buy', { state: { totalPrice } });
  };

  const handleUdashboard = () => {
    navigate('/udashboard');
  };

  // Define cart container styles
  const cartContainerStyle = {
    minHeight: '100vh',
    padding: '30px',
    background: 'linear-gradient(135deg, rgba(30, 15, 60, 0.92), rgba(20, 10, 40, 0.95))',
    backgroundImage: 'url("/fish-background.jpg")', // Add your background image path
    backgroundSize: 'cover',
    backgroundBlendMode: 'overlay',
    backgroundAttachment: 'fixed',
    color: 'white',
    fontFamily: '"Poppins", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  // Cart card styles
  const cartCardStyle = {
    width: '100%',
    maxWidth: '900px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 35px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '30px',
  };

  // Header styles
  const headerStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
    textShadow: '0 2px 10px rgba(123, 104, 238, 0.6)',
    background: 'linear-gradient(45deg, #a78bfa, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // Back button styles
  const backButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'linear-gradient(45deg, #8b5cf6, #6366f1)',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(123, 104, 238, 0.4)',
  };

  // Cart item styles
  const cartItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  // Cart item image styles
  const cartItemImageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  };

  // Cart item info container styles
  const infoContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  // Cart item title styles
  const titleStyle = {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '10px',
  };

  // Price styles
  const priceStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#FEFEFF',
    marginBottom: '10px',
  };

  // Quantity control styles
  const quantityControlStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  };

  // Quantity label styles
  const quantityLabelStyle = {
    fontSize: '1rem',
    marginRight: '10px',
  };

  // Quantity input styles
  const quantityInputStyle = {
    width: '60px',
    padding: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '1rem',
    textAlign: 'center',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  // Remove button styles
  const removeButtonStyle = {
    background: 'linear-gradient(45deg, #9333ea, #7c3aed)',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(123, 104, 238, 0.3)',
  };

  // Buy button styles
  const buyButtonStyle = {
    background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
    color: 'white',
    border: 'none',
    padding: '15px 25px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(123, 104, 238, 0.4)',
    marginTop: '20px',
    width: '100%',
    maxWidth: '200px',
  };

  // Total price styles
  const totalPriceStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'white',
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'right',
    background: 'linear-gradient(45deg, #a78bfa, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // Empty cart message styles
  const emptyCartStyle = {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: '20px',
  };

  // Button hover effects
  const buttonHoverEffect = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 6px 20px rgba(123, 104, 238, 0.5)';
  };

  const buttonLeaveEffect = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 4px 15px rgba(123, 104, 238, 0.4)';
  };

  // Item hover effects
  const itemHoverEffect = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
  };

  const itemLeaveEffect = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
  };

  return (
    <div style={cartContainerStyle}>
      <button 
        style={backButtonStyle} 
        onClick={handleUdashboard}
        onMouseEnter={buttonHoverEffect}
        onMouseLeave={buttonLeaveEffect}
      >
        ⬅️ Back to Dashboard
      </button>

      <div style={cartCardStyle}>
        <h2 style={headerStyle}>Your Shopping Cart</h2>
        
        {cart.products.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {cart.products.map((product) => (
                product.productId && (
                  <div 
                    key={product.productId._id} 
                    style={cartItemStyle}
                    onMouseEnter={itemHoverEffect}
                    onMouseLeave={itemLeaveEffect}
                  >
                    <img 
                      src={`${import.meta.env.VITE_BACKEND_URL}${product.productId.imageUrl}`} 
                      alt={product.productId.name} 
                      style={cartItemImageStyle}
                    />
                    <h3 style={titleStyle}>{product.productId.name}</h3>
                    <p style={priceStyle}>₹{product.productId.price.toLocaleString()}</p>
                    
                    <div style={quantityControlStyle}>
                      <span style={quantityLabelStyle}>Quantity: </span>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value >= 1 && value <= 10) {
                            updateQuantity(product.productId._id, value);
                          }
                        }}
                        min="1"
                        max="10"
                        style={quantityInputStyle}
                      />
                    </div>
                    
                    <button 
                      style={removeButtonStyle} 
                      onClick={() => removeItem(product.productId._id)}
                      onMouseEnter={buttonHoverEffect}
                      onMouseLeave={buttonLeaveEffect}
                    >
                      Remove
                    </button>
                  </div>
                )
              ))}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '30px' }}>
              <h3 style={totalPriceStyle}>Total: ₹{totalPrice.toLocaleString()}</h3>
              <button 
                style={buyButtonStyle} 
                onClick={handleBuy}
                onMouseEnter={buttonHoverEffect}
                onMouseLeave={buttonLeaveEffect}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
            <p style={emptyCartStyle}>Your cart is empty. Add some delicious fish to get started!</p>
            <button 
              style={{...backButtonStyle, position: 'static', marginTop: '20px'}} 
              onClick={handleUdashboard}
              onMouseEnter={buttonHoverEffect}
              onMouseLeave={buttonLeaveEffect}
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;