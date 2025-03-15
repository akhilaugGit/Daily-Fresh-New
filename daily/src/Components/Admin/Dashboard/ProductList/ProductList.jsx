import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/view-product`)  
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/delete/${id}`)
                .then(response => {
                    setProducts(products.filter(product => product._id !== id));
                    console.log("Product deleted successfully");
                })
                .catch(error => {
                    console.error("There was an error deleting the product!", error);
                });
        }
    };

    const handledashboard = () => {
        navigate('/dashboard');
    };

    const containerStyle = {
        padding: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,240,255,0.9) 100%)',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        fontFamily: '"Poppins", "Segoe UI", Arial, sans-serif',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        padding: '0 10px',
    };

    const titleStyle = {
        fontSize: '32px',
        fontWeight: '600',
        backgroundImage: 'linear-gradient(135deg, #6a3093 0%, #4CAF50 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        margin: '0',
    };

    const backButtonStyle = {
        padding: '10px 20px',
        backgroundColor: '#6a3093',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(106, 48, 147, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    const hoverStyle = (e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(106, 48, 147, 0.4)';
    };

    const unhoverStyle = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(106, 48, 147, 0.3)';
    };

    const productGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
    };

    const productCardStyle = {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    };

    const imageContainerStyle = {
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
    };

    const cardContentStyle = {
        padding: '20px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
    };

    const productNameStyle = {
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '10px',
        color: '#333',
    };

    const productDescStyle = {
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px',
        flex: '1',
    };

    const productPriceStyle = {
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '5px',
        color: '#4CAF50',
    };

    const productCategoryStyle = {
        fontSize: '12px',
        color: '#6a3093',
        marginBottom: '15px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: '500',
    };

    const productActionsStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        paddingTop: '15px',
    };

    const editButtonStyle = {
        padding: '8px 16px',
        backgroundColor: 'rgba(106, 48, 147, 0.1)',
        color: '#6a3093',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    const cardHoverStyle = (e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    };

    const cardUnhoverStyle = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h2 style={titleStyle}>Admin Edit Products</h2>
                <button 
                    onClick={handledashboard} 
                    style={backButtonStyle}
                    onMouseEnter={hoverStyle}
                    onMouseLeave={unhoverStyle}
                >
                    ⬅️ Back to Dashboard
                </button>
            </div>
            
            <div style={productGridStyle}>
                {products.map(product => (
                    <div 
                        key={product._id} 
                        style={productCardStyle}
                        onMouseEnter={cardHoverStyle}
                        onMouseLeave={cardUnhoverStyle}
                    >
                        <div style={imageContainerStyle}>
                            <img 
                                src={`${import.meta.env.VITE_BACKEND_URL}${product.imageUrl}`}
                                alt={product.name} 
                                style={imageStyle}
                            />
                        </div>
                        <div style={cardContentStyle}>
                            <h3 style={productNameStyle}>{product.name}</h3>
                            <div style={productCategoryStyle}>{product.category}</div>
                            <p style={productDescStyle}>{product.description}</p>
                            <div style={productPriceStyle}>₹{product.price.toLocaleString()}</div>
                            
                            <div style={productActionsStyle}>
                                <Link to={`/edit-product/${product._id}`}>
                                    <button 
                                        style={editButtonStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(106, 48, 147, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(106, 48, 147, 0.1)';
                                        }}
                                    >
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;