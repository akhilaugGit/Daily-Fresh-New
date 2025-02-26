import React from 'react';
import { useNavigate } from 'react-router-dom';
import logosImage from '../../assets/file.png';

const Dnavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        
        navigate('/login');
    };
    const handleCart = () => {
        
        navigate('/cart');
    };
    const handleUprofile = () => {
        
        navigate('/duprofile');
    };


    const handleHomeClick = () => {
        navigate('/udashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top (Home)
    };
    const handleAboutClick = () => {
        navigate('/about');
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

            </div>
            <div className="icons">
            <span id= "prf"onClick={handleUprofile} style={{ cursor: 'pointer' }}>Profile</span>
                <span className="icon">👤</span>
                <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>

                
            </div>
        </nav>
    );
};

export default Dnavbar;
