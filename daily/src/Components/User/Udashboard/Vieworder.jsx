import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();

  // Fetch user's orders when component mounts
  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Not authenticated. Please login.');
        setLoading(false);
        return;
      }

      // Call the endpoint that gets orders for the logged-in user
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your orders. Please try again later.');
      setLoading(false);
    }
  };

  const toggleExpandOrder = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA500'; // Orange
      case 'completed':
        return '#008000'; // Green
      case 'failed':
        return '#FF0000'; // Red
      default:
        return '#000'; // Black
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'pending':
        return 'Your order is being processed';
      case 'completed':
        return 'Your order has been delivered';
      case 'failed':
        return 'There was an issue with your order';
      default:
        return '';
    }
  };

  const handleBack = () => {
    navigate('/udashboard'); // Navigate back to user dashboard
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleBack} style={styles.backButton}>⬅️ Back</button>
        <h1 style={styles.title}>My Orders</h1>
        <button onClick={fetchUserOrders} style={styles.refreshButton}>🔄 Refresh</button>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      
      {loading ? (
        <div style={styles.loading}>Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div style={styles.noOrders}>
          <p>You haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate('/cart')} 
            style={styles.shopButton}
          >
            View Cart
          </button>
        </div>
      ) : (
        <div style={styles.ordersContainer}>
          {orders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <div 
                style={styles.orderHeader} 
                onClick={() => toggleExpandOrder(order._id)}
              >
                <div style={styles.orderSummary}>
                  <span style={styles.orderDate}>{formatDate(order.orderDate)}</span>
                  <span style={styles.orderAmount}>₹{order.amount}</span>
                  <span style={{
                    ...styles.orderStatus,
                    backgroundColor: getStatusColor(order.status)
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div style={styles.expandIcon}>
                  {expandedOrderId === order._id ? '▼' : '▶'}
                </div>
              </div>

              {expandedOrderId === order._id && (
                <div style={styles.orderDetails}>
                  <div style={styles.statusMessage}>
                    <p style={{
                      color: getStatusColor(order.status),
                      fontWeight: 'bold'
                    }}>
                      {getStatusMessage(order.status)}
                    </p>
                  </div>
                  
                  <div style={styles.shippingInfo}>
                    <h3>Shipping Information</h3>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Location:</strong> {order.location}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                  </div>

                  <div style={styles.paymentInfo}>
                    <h3>Payment Information</h3>
                    <p><strong>Payment ID:</strong> {order.paymentId}</p>
                    <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                    <p><strong>Total Amount:</strong> ₹{order.amount}</p>
                  </div>

                  <div style={styles.productList}>
                    <h3>Products Ordered</h3>
                    {order.products && order.products.length > 0 ? (
                      <div style={styles.productsGrid}>
                        {order.products.map((product, index) => (
                          <div key={index} style={styles.productCard}>
                            {product.productId && (
                              <>
                                <div style={styles.productImageContainer}>
                                  {product.productId.imageUrl && (
                                    <img 
                                      src={`${import.meta.env.VITE_BACKEND_URL}${product.productId.imageUrl}`} 
                                      alt={product.productId.name || 'Product'} 
                                      style={styles.productImage}
                                    />
                                  )}
                                </div>
                                <div style={styles.productInfo}>
                                  <p style={styles.productName}>{product.productId.name}</p>
                                  <p style={styles.productPrice}>
                                    ₹{product.productId.price} × {product.quantity}
                                  </p>
                                  <p style={styles.productTotal}>
                                    Total: ₹{product.productId.price * product.quantity}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No product details available</p>
                    )}
                  </div>

                  {order.status === 'completed' && (
                    <div style={styles.reorderSection}>
                      <button
                        onClick={() => navigate('/products')}
                        style={styles.reorderButton}
                      >
                        Shop Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  title: {
    margin: '0',
    color: '#333',
  },
  refreshButton: {
    padding: '8px 16px',
    backgroundColor: '#3399cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
  },
  noOrders: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: '#666',
  },
  shopButton: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#3399cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  ordersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  orderCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  orderHeader: {
    padding: '15px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  orderSummary: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  orderDate: {
    fontSize: '14px',
    color: '#666',
  },
  orderAmount: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  orderStatus: {
    padding: '4px 8px',
    borderRadius: '4px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  expandIcon: {
    fontSize: '16px',
    color: '#666',
  },
  orderDetails: {
    padding: '20px',
    borderTop: '1px solid #eee',
  },
  statusMessage: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  shippingInfo: {
    marginBottom: '20px',
  },
  paymentInfo: {
    marginBottom: '20px',
  },
  productList: {
    marginBottom: '20px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  productCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  productImageContainer: {
    height: '150px',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '10px',
  },
  productName: {
    margin: '0 0 5px 0',
    fontWeight: 'bold',
  },
  productPrice: {
    margin: '0 0 5px 0',
    color: '#666',
  },
  productTotal: {
    margin: '0',
    fontWeight: 'bold',
    color: '#3399cc',
  },
  reorderSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  reorderButton: {
    padding: '10px 20px',
    backgroundColor: '#3399cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default ViewOrder;