import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logosImage from '../../../../assets/file.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('userVerified');
        navigate('/login');
    };

    const handleNavigation = (path, item) => {
        setActiveItem(item);
        navigate(path);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fish-themed gradient colors
    const gradientBg = "linear-gradient(135deg, rgba(0,71,98,0.95) 0%, rgba(12,91,122,0.92) 50%, rgba(0,125,161,0.9) 100%)";
    
    // Navbar Container Styles
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        background: gradientBg,
        color: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    };

    // Logo Container Styles
    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    const logoStyle = {
        height: '38px',
        borderRadius: '8px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
        transition: 'transform 0.3s ease',
    };

    const logoTextStyle = {
        fontSize: '1.4rem',
        fontWeight: '600',
        background: 'linear-gradient(90deg, #ffffff, #a3f7ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        letterSpacing: '0.5px'
    };

    // Navigation Items Container
    const navItemsStyle = {
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            display: isMenuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            background: gradientBg,
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }
    };

    // Navigation Item Style
    const navItemStyle = (item) => ({
        position: 'relative',
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '8px',
        fontSize: '0.95rem',
        fontWeight: '500',
        letterSpacing: '0.3px',
        transition: 'all 0.3s ease',
        background: activeItem === item ? 'rgba(255,255,255,0.15)' : 'transparent',
        boxShadow: activeItem === item ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        '&:hover': {
            background: 'rgba(255,255,255,0.1)',
            transform: 'translateY(-2px)'
        }
    });

    // Icons Container Style
    const iconsContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    };

    const iconStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        '&:hover': {
            background: 'rgba(255,255,255,0.1)',
        }
    };

    const logoutBtnStyle = {
        padding: '8px 16px',
        borderRadius: '8px',
        background: 'rgba(255, 87, 87, 0.2)',
        color: '#ff5757',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 87, 87, 0.3)',
        '&:hover': {
            background: 'rgba(255, 87, 87, 0.3)',
            transform: 'translateY(-2px)'
        }
    };

    const hamburgerStyle = {
        display: 'none',
        '@media (max-width: 768px)': {
            display: 'block',
            cursor: 'pointer',
            fontSize: '1.5rem'
        }
    };

    // Function to apply hover effects via inline styles would need JavaScript
    // but we'll use the style attribute's hover property in the JSX

    // Subtle wave animation for aquatic feel
    const waveAnimationStyle = {
        position: 'absolute',
        bottom: '-5px',
        left: 0,
        width: '100%',
        height: '5px',
        background: 'linear-gradient(90deg, transparent, rgba(163, 247, 255, 0.5), transparent)',
        animation: 'wave 3s infinite ease-in-out',
        '@keyframes wave': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
        }
    };

    return (
        <nav style={navbarStyle}>
            <div style={logoContainerStyle}>
                <img 
                    style={{...logoStyle, transform: 'scale(1.05)'}} 
                    src={logosImage} 
                    alt="Daily Fresh Fish" 
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1.05)'}
                />
                <div style={logoTextStyle}>Daily Fresh</div>
            </div>
            
            <div style={{
                ...navItemsStyle, 
                display: window.innerWidth <= 768 ? (isMenuOpen ? 'flex' : 'none') : 'flex',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                position: window.innerWidth <= 768 ? 'absolute' : 'static',
                top: window.innerWidth <= 768 ? '70px' : 'auto',
                left: window.innerWidth <= 768 ? 0 : 'auto',
                right: window.innerWidth <= 768 ? 0 : 'auto',
                background: window.innerWidth <= 768 ? gradientBg : 'transparent',
                padding: window.innerWidth <= 768 ? '16px' : 0,
                boxShadow: window.innerWidth <= 768 ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
            }}>
                <div 
                    style={{
                        ...navItemStyle('addProduct'),
                        background: activeItem === 'addProduct' ? 'rgba(255,255,255,0.15)' : 'transparent',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = activeItem === 'addProduct' ? 'rgba(255,255,255,0.15)' : 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => handleNavigation('/add-product', 'addProduct')}
                >
                    <span style={{fontSize: '1.1rem'}}>🐟</span> Add Product
                </div>
                
                <div 
                    style={{
                        ...navItemStyle('editProduct'),
                        background: activeItem === 'editProduct' ? 'rgba(255,255,255,0.15)' : 'transparent',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = activeItem === 'editProduct' ? 'rgba(255,255,255,0.15)' : 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => handleNavigation('/products', 'editProduct')}
                >
                    <span style={{fontSize: '1.1rem'}}>✏️</span> Edit Product
                </div>
                
                <div 
                    style={{
                        ...navItemStyle('users'),
                        background: activeItem === 'users' ? 'rgba(255,255,255,0.15)' : 'transparent',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = activeItem === 'users' ? 'rgba(255,255,255,0.15)' : 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => handleNavigation('/manage', 'users')}
                >
                    <span style={{fontSize: '1.1rem'}}>👥</span> Users
                </div>
                
                <div 
                    style={{
                        ...navItemStyle('deliveryPartners'),
                        background: activeItem === 'deliveryPartners' ? 'rgba(255,255,255,0.15)' : 'transparent',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = activeItem === 'deliveryPartners' ? 'rgba(255,255,255,0.15)' : 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => handleNavigation('/managedusers', 'deliveryPartners')}
                >
                    <span style={{fontSize: '1.1rem'}}>🛵|🧑‍🌾</span> Special User
                </div>
            </div>
            
            <div style={iconsContainerStyle}>
                <div 
                    style={{
                        ...iconStyle,
                        background: 'rgba(7, 89, 133, 0.4)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(7, 89, 133, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(7, 89, 133, 0.4)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <span style={{fontSize: '1.1rem'}}>👤</span> Admin
                </div>
                
                <div 
                    style={{
                        ...logoutBtnStyle
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 87, 87, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 87, 87, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </div>
                
                <div 
                    style={{
                        ...iconStyle,
                        position: 'relative',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <span style={{fontSize: '1.1rem'}}>🛒</span>
                </div>
            </div>
            
            <div 
                style={hamburgerStyle}
                onClick={toggleMenu}
            >
                {isMenuOpen ? '✕' : '☰'}
            </div>
            
            <div style={waveAnimationStyle}></div>
        </nav>
    );
};

export default Navbar;