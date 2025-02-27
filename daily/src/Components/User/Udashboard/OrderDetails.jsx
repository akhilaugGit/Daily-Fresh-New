import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Adjusted import

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Fetch user profile first, then fetch orders
    const initialize = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Not authenticated. Please login.');
          return;
        }

        // Fetch user profile first
        const profileResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUserInfo(profileResponse.data);

        // Then fetch orders
        await fetchOrders();
      } catch (err) {
        console.error('Error initializing:', err);
        setError('Failed to initialize. Please try again later.');
      }
    };

    initialize();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Not authenticated. Please login.');
        setLoading(false);
        return;
      }

      // Add console.log to see user info before fetching
      console.log('Current user info:', userInfo);

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Add console.log to see response data
      console.log('Orders received:', response.data);

      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Not authenticated. Please login.');
        return;
      }
      
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/update-status`,
        { orderId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state to reflect changes
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));

    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
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

  const handleBack = () => {
    navigate('/duser'); // Adjust based on your admin dashboard route
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleBack} style={styles.backButton}>⬅️ Back</button>
        <h1 style={styles.title}>
          {userInfo?.isDuser 
            ? `Orders for ${userInfo.location}`
            : 'All Orders'}
        </h1>
        <button onClick={fetchOrders} style={styles.refreshButton}>🔄 Refresh</button>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      
      {loading ? (
        <div style={styles.loading}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div style={styles.noOrders}>No orders found</div>
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
                  <div style={styles.customerInfo}>
                    <h3>Customer Information</h3>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Location:</strong> {order.location}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Payment ID:</strong> {order.paymentId}</p>
                  </div>

                  <div style={styles.productList}>
                    <h3>Products Ordered</h3>
                    {order.products && order.products.length > 0 ? (
                      <ul style={styles.productListItems}>
                        {order.products.map((product, index) => (
                          <li key={index} style={styles.productItem}>
                            {product.productId && product.productId.name ? (
                              <>
                                <span>{product.productId.name}</span>
                                <span>Qty: {product.quantity}</span>
                                <span>₹{product.productId.price * product.quantity}</span>
                              </>
                            ) : (
                              <span>Product details not available</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No product details available</p>
                    )}
                  </div>

                  <div style={styles.statusControl}>
                    <h3>Update Status</h3>
                    <div style={styles.statusButtons}>
                      <button
                        style={{
                          ...styles.statusButton,
                          backgroundColor: order.status === 'pending' ? '#FFA500' : '#f0f0f0',
                          color: order.status === 'pending' ? '#fff' : '#333'
                        }}
                        onClick={() => updateOrderStatus(order._id, 'pending')}
                      >
                        Pending
                      </button>
                      <button
                        style={{
                          ...styles.statusButton,
                          backgroundColor: order.status === 'completed' ? '#008000' : '#f0f0f0',
                          color: order.status === 'completed' ? '#fff' : '#333'
                        }}
                        onClick={() => updateOrderStatus(order._id, 'completed')}
                      >
                        Completed
                      </button>
                      <button
                        style={{
                          ...styles.statusButton,
                          backgroundColor: order.status === 'failed' ? '#FF0000' : '#f0f0f0',
                          color: order.status === 'failed' ? '#fff' : '#333'
                        }}
                        onClick={() => updateOrderStatus(order._id, 'failed')}
                      >
                        Failed
                      </button>
                    </div>
                  </div>
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
    maxWidth: '1200px',
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
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: '#666',
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
    padding: '15px',
    borderTop: '1px solid #eee',
  },
  customerInfo: {
    marginBottom: '20px',
  },
  productList: {
    marginBottom: '20px',
  },
  productListItems: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  productItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  statusControl: {
    marginTop: '20px',
  },
  statusButtons: {
    display: 'flex',
    gap: '10px',
  },
  statusButton: {
    padding: '8px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s, color 0.2s',
  }
};

export default OrderDetails;