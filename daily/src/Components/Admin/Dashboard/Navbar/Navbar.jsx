import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import logosImage from '../../../../assets/file.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user verification from local storage
        localStorage.removeItem('userVerified');
        // Redirect to the login page
        navigate('/login');
    };

    const handleAddProduct = () => {
        // Remove user verification from local storage
        // Redirect to the login page
        navigate('/add-product');
    };
    const handleEditProduct = () => {
        // Remove user verification from local storage
        // Redirect to the login page
        navigate('/products');
    };
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img className="logo-small" src={logosImage} alt="Logo" /> 
                <div className="logo-text">Daily Fresh</div>
            </div>
            <div className="navbar-items">
                <span>Home</span>
                <span>Products</span>
                <span>Contact</span>
                <span onClick={handleAddProduct} style={{ cursor: 'pointer' }}>AddProduct</span>
                <span onClick={handleEditProduct} style={{ cursor: 'pointer' }}>EditProduct</span>


            </div>
          
            <div className="icons">
            <span className="icon">👤</span>

            <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>

                <span className="icon">🛒</span>
            </div>
        </nav>
    );
};

export default Navbar;
