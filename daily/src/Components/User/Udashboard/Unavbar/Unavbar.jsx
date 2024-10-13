import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unavbar.css';
import logosImage from '../../../../assets/file.png';

const Unavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userVerified');
        navigate('/login');
    };

    const handleHomeClick = () => {
        navigate('/udashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top (Home)
    };

    const handleProductsClick = () => {
        navigate('/udashboard');
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight / 2, behavior: 'smooth' }); // Scroll to the middle
        }, 300);
    };

    const handleContactClick = () => {
        navigate('/udashboard');
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Scroll to bottom
        }, 300);
    };

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img className="logo-small" src={logosImage} alt="Logo" />
                <div className="logo-text">Daily Fresh</div>
            </div>
            <div className="navbar-items">
                <span onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Home</span>
                <span onClick={handleProductsClick} style={{ cursor: 'pointer' }}>Products</span>
                <span onClick={handleContactClick} style={{ cursor: 'pointer' }}>Contact</span>
            </div>
            <div className="icons">
                <span className="icon">👤</span>
                <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                <span className="icon">🛒</span>
            </div>
        </nav>
    );
};

export default Unavbar;
