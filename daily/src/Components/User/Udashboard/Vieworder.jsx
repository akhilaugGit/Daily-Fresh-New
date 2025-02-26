import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();

  // Animation frames for delivery person on scooter
  const [frame, setFrame] = useState(0);
  const totalFrames = 4;

  useEffect(() => {
    // Animation loop for the scooter animation
    const animationInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % totalFrames);
    }, 200);

    return () => clearInterval(animationInterval);
  }, []);

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
        return '#FFC107'; // Amber
      case 'completed':
        return '#4CAF50'; // Green
      case 'failed':
        return '#F44336'; // Red
      default:
        return '#000'; // Black
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'pending':
        return 'Your order is being prepared';
      case 'completed':
        return 'Your order has been delivered';
      case 'failed':
        return 'There was an issue with your order';
      default:
        return '';
    }
  };

  const DeliveryAnimation = ({ status }) => {
    if (status === 'completed') {
      return (
        <div style={styles.deliveryComplete}>
          <div style={styles.checkmark}>✓</div>
          <div style={styles.deliveredText}>Delivered Successfully</div>
        </div>
      );
    }
    
    if (status === 'failed') {
      return (
        <div style={styles.deliveryFailed}>
          <div style={styles.xmark}>✕</div>
          <div style={styles.failedText}>Delivery Failed</div>
        </div>
      );
    }
    
    return (
      <div style={styles.deliveryContainer}>
        <div style={{...styles.roadLine, width: `${frame * 25}%`}}></div>
        <div style={{...styles.scooter, left: `${frame * 25}%`}}>
          🛵
        </div>
        <div style={styles.packageIcon}>📦</div>
        <div style={styles.homeIcon}>🏠</div>
      </div>
    );
  };

  const OrderProgress = ({ status }) => {
    const steps = ['Order Placed', 'Preparing', 'On the way', 'Delivered'];
    let currentStep = 0;
    
    switch (status) {
      case 'pending':
        currentStep = 1;
        break;
      case 'completed':
        currentStep = 3;
        break;
      default:
        currentStep = 0;
    }
    
    return (
      <div style={styles.progressContainer}>
        {steps.map((step, index) => (
          <div key={index} style={styles.progressStep}>
            <div style={{
              ...styles.progressDot,
              backgroundColor: index <= currentStep ? getStatusColor(status) : '#ddd'
            }}></div>
            <div style={{
              ...styles.progressLabel,
              color: index <= currentStep ? getStatusColor(status) : '#999'
            }}>
              {step}
            </div>
            {index < steps.length - 1 && (
              <div style={{
                ...styles.progressLine,
                backgroundColor: index < currentStep ? getStatusColor(status) : '#ddd'
              }}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleBack = () => {
    navigate('/udashboard'); // Navigate back to user dashboard
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleBack} >
          <span>Back</span>
        </button>
        <h1 style={styles.title}>My Orders</h1>
        <button onClick={fetchUserOrders} style={styles.refreshButton}>
          <span style={styles.refreshIcon}>↻</span>
          <span>Refresh</span>
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <div style={styles.loadingText}>Getting your orders...</div>
        </div>
      ) : orders.length === 0 ? (
        <div style={styles.noOrders}>
          <div style={styles.emptyCartIcon}>🛒</div>
          <p style={styles.noOrdersText}>You haven't placed any orders yet</p>
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
            <div key={order._id} style={{
              ...styles.orderCard,
              transform: expandedOrderId === order._id ? 'scale(1.01)' : 'scale(1)',
            }}>
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
                <div style={{
                  ...styles.expandIcon,
                  transform: expandedOrderId === order._id ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>
                  ▼
                </div>
              </div>

              {expandedOrderId === order._id && (
                <div style={styles.orderDetails}>
                  <div style={styles.animationSection}>
                    <DeliveryAnimation status={order.status} />
                  </div>
                  
                  <div style={styles.orderProgressSection}>
                    <OrderProgress status={order.status} />
                  </div>
                  
                  <div style={styles.statusMessage}>
                    <p style={{
                      color: getStatusColor(order.status),
                      fontWeight: 'bold',
                      margin: '20px 0',
                      fontSize: '18px'
                    }}>
                      {getStatusMessage(order.status)}
                    </p>
                  </div>
                  
                  <div style={styles.detailsGrid}>
                    <div style={styles.shippingInfo}>
                      <h3 style={styles.sectionTitle}>Shipping Information</h3>
                      <div style={styles.infoCard}>
                        <div style={styles.infoRow}>
                          <span style={styles.infoLabel}>Phone:</span>
                          <span style={styles.infoValue}>{order.phone}</span>
                        </div>
                        <div style={styles.infoRow}>
                          <span style={styles.infoLabel}>Location:</span>
                          <span style={styles.infoValue}>{order.location}</span>
                        </div>
                        <div style={styles.infoRow}>
                          <span style={styles.infoLabel}>Address:</span>
                          <span style={styles.infoValue}>{order.address}</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.paymentInfo}>
                      <h3 style={styles.sectionTitle}>Payment Information</h3>
                      <div style={styles.infoCard}>
                        <div style={styles.infoRow}>
                          <span style={styles.infoLabel}>Payment ID:</span>
                          <span style={styles.infoValue}>{order.paymentId}</span>
                        </div>
                        <div style={styles.infoRow}>
                          <span style={styles.infoLabel}>Order Date:</span>
                          <span style={styles.infoValue}>{formatDate(order.orderDate)}</span>
                        </div>
                        <div style={styles.infoRow}>
                          <span style={styles.infoLabel}>Total Amount:</span>
                          <span style={styles.infoValue}>₹{order.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.productList}>
                    <h3 style={styles.sectionTitle}>Products Ordered</h3>
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
                                  <div style={styles.productPriceRow}>
                                    <p style={styles.productPrice}>
                                      ₹{product.productId.price} × {product.quantity}
                                    </p>
                                    <p style={styles.productTotal}>
                                      ₹{product.productId.price * product.quantity}
                                    </p>
                                  </div>
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
                        onClick={() => navigate('/udashboard')}
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
    fontFamily: '"Poppins", "Segoe UI", Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '0 0 15px 0',
    borderBottom: '1px solid #eaeaea',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
  },
  backIcon: {
    marginRight: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  title: {
    margin: '0',
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
  },
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#FC8019',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
  },
  refreshIcon: {
    marginRight: '8px',
    fontSize: '16px',
  },
  error: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #FFCDD2',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #FC8019',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    color: '#666',
    fontSize: '16px',
  },
  noOrders: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  emptyCartIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  noOrdersText: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    color: '#666',
  },
  shopButton: {
    padding: '12px 24px',
    backgroundColor: '#FC8019',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
  },
  ordersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  orderCard: {
    border: 'none',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
  },
  orderHeader: {
    padding: '20px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderBottom: '1px solid #f0f0f0',
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
    borderRight: '1px solid #eee',
    paddingRight: '15px',
  },
  orderAmount: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333',
  },
  orderStatus: {
    padding: '5px 10px',
    borderRadius: '50px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  expandIcon: {
    fontSize: '14px',
    color: '#999',
    transition: 'transform 0.6s ease',
  },
  orderDetails: {
    padding: '20px',
    backgroundColor: 'white',
  },
  animationSection: {
    marginBottom: '30px',
  },
  deliveryContainer: {
    position: 'relative',
    height: '80px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '20px',
    overflow: 'hidden',
  },
 roadLine: {
    position: 'absolute',
    height: '4px',
    backgroundColor: '#FC8019',
    bottom: '30px',
    left: '10%',
    transition: 'width 1s ease-in-out', /* Increased the duration and added easing */
  },
  scooter: {
    position: 'absolute',
    fontSize: '32px',
    bottom: '20px',
    transition: 'left 1s ease-in-out', /* Increased the duration and added easing */
  },
  packageIcon: {
    position: 'absolute',
    fontSize: '24px',
    left: '10%',
    bottom: '25px',
  },
  homeIcon: {
    position: 'absolute',
    fontSize: '24px',
    right: '10%',
    bottom: '25px',
  },
  deliveryComplete: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
  },
  checkmark: {
    fontSize: '32px',
    color: '#4CAF50',
    marginBottom: '10px',
  },
  deliveredText: {
    color: '#388E3C',
    fontWeight: 'bold',
  },
  deliveryFailed: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#ffebee',
    borderRadius: '8px',
  },
  xmark: {
    fontSize: '32px',
    color: '#F44336',
    marginBottom: '10px',
  },
  failedText: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  orderProgressSection: {
    marginBottom: '20px',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    margin: '30px 0',
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  progressDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginBottom: '8px',
    transition: 'background-color 0.3s',
  },
  progressLabel: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
  },
  progressLine: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    width: '100%',
    height: '3px',
    backgroundColor: '#ddd',
    zIndex: 0,
  },
  statusMessage: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  shippingInfo: {
    padding: '5px',
  },
  paymentInfo: {
    padding: '5px',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '15px',
    fontWeight: '600',
    position: 'relative',
    paddingLeft: '15px',
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  infoRow: {
    display: 'flex',
    marginBottom: '10px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  infoLabel: {
    width: '40%',
    color: '#777',
    fontWeight: '500',
  },
  infoValue: {
    width: '60%',
    fontWeight: '400',
  },
  productList: {
    marginBottom: '30px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  productCard: {
    border: '1px solid #eee',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
  },
  productImageContainer: {
    height: '180px',
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
    transition: 'transform 0.3s ease',
  },
  productInfo: {
    padding: '15px',
  },
  productName: {
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
  },
  productPriceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    margin: '0',
    color: '#666',
    fontSize: '14px',
  },
  productTotal: {
    margin: '0',
    fontWeight: 'bold',
    color: '#FC8019',
    fontSize: '15px',
  },
  reorderSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  reorderButton: {
    padding: '12px 30px',
    backgroundColor: '#FC8019',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(252, 128, 25, 0.3)',
    transition: 'all 0.3s ease',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default ViewOrder;