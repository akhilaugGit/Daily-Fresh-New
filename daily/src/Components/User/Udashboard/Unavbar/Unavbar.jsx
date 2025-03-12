import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logosImage from '../../../../assets/file.png';

const Unavbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Track scroll position for navbar effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleCart = () => {
        navigate('/cart');
    };

    const handleUprofile = () => {
        navigate('/uprofile');
    };

    const handleOrderClick = () => {
        navigate('/vieworder');
    };

    const handleHomeClick = () => {
        navigate('/udashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAboutClick = () => {
        navigate('/about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleProductsClick = () => {
        navigate('/udashboard');
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight / 2, behavior: 'smooth' });
        }, 300);
    };

    const handleContactClick = () => {
        navigate('/udashboard');
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 300);
    };

    const handleTaste = () => {
        navigate('/taste');
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 300);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Styling constants
    const colors = {
        primary: '#351a5d',
        secondary: '#9153AD',
        accent: '#49b6e9',
        light: '#e8f4f8',
        text: '#2a3540',
        textLight: '#ffffff',
        transparent: 'rgba(255, 255, 255, 0.85)'
    };

    // Common styles
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        transition: 'all 0.3s ease',
        fontWeight: '500',
        textDecoration: 'none',
        color: isScrolled ? colors.text : colors.textLight,
        marginLeft: '0.75rem',
        cursor: 'pointer',
    };

    const buttonHoverStyle = {
        background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
        color: colors.light,
        boxShadow: '0 4px 15px rgba(73, 182, 233, 0.3)',
        transform: 'translateY(-2px)'
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: isScrolled ? '0.5rem 2rem' : '1rem 2rem',
            background: isScrolled 
                ? colors.transparent 
                : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            backdropFilter: isScrolled ? 'blur(8px)' : 'none',
            boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
            borderBottom: isScrolled ? `1px solid rgba(255, 255, 255, 0.18)` : 'none',
            transition: 'all 0.3s ease',
            fontFamily: "'Poppins', 'Segoe UI', Roboto, sans-serif",
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                {/* Logo */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <img 
                        src={logosImage} 
                        alt="Daily Fresh Fish" 
                        style={{
                            height: '2.5rem',
                            marginRight: '0.75rem',
                            filter: isScrolled ? 'none' : 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))',
                            transition: 'filter 0.3s ease',
                        }}
                    />
                    <h1 style={{
                        color: isScrolled ? colors.primary : colors.light,
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textShadow: isScrolled ? 'none' : '0 2px 5px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                    }} onClick={handleHomeClick}>
                        Daily Fresh
                        <span style={{
                            fontSize: '0.8rem',
                            background: `linear-gradient(135deg, ${colors.accent}, #4ECDC4)`,
                            color: 'white',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '1rem',
                            marginLeft: '0.5rem',
                            boxShadow: '0 2px 8px rgba(78, 205, 196, 0.5)',
                        }}>
                            Premium Seafood
                        </span>
                    </h1>
                </div>

                {/* Mobile Menu Button */}
                <div style={{
                    display: 'none',
                    '@media (max-width: 768px)': {
                        display: 'block',
                    }
                }}>
                    <button onClick={toggleMobileMenu} style={{
                        background: 'transparent',
                        border: 'none',
                        color: isScrolled ? colors.primary : colors.light,
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        display: 'none',
                        '@media (max-width: 768px)': {
                            display: 'block',
                        }
                    }}>
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    '@media (max-width: 768px)': {
                        display: 'none',
                    }
                }}>
                    {["Home", "Products", "Contact", "About", "Orders"].map((item, index) => (
                        <div
                            key={index}
                            onClick={
                                item === "Home" ? handleHomeClick :
                                item === "Products" ? handleProductsClick :
                                item === "Contact" ? handleContactClick :
                                item === "About" ? handleAboutClick :
                                handleOrderClick
                            }
                            style={{
                                ...buttonStyle,
                                position: 'relative',
                                ':hover': buttonHoverStyle,
                            }}
                            onMouseEnter={(e) => {
                                Object.assign(e.currentTarget.style, buttonHoverStyle);
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = isScrolled ? colors.text : colors.textLight;
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {item}
                            <span style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '50%',
                                width: '0',
                                height: '2px',
                                background: `linear-gradient(to right, ${colors.accent}, transparent)`,
                                transition: 'width 0.3s ease, transform 0.3s ease',
                                transform: 'translateX(-50%)',
                            }}></span>
                        </div>
                    ))}
                    
                    <div
                        onClick={handleTaste}
                        style={{
                            ...buttonStyle,
                            background: `linear-gradient(135deg, #4ECDC4, #49b6e9)`,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 4px 15px rgba(255, 94, 98, 0.3)',
                            ':hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(255, 94, 98, 0.4)',
                            }
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 94, 98, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 94, 98, 0.3)';
                        }}
                    >
                        ✨ TasteLens
                    </div>
                </div>

                {/* User Actions */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    '@media (max-width: 768px)': {
                        display: 'none',
                    }
                }}>
                    <div onClick={handleUprofile} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '1rem',
                        cursor: 'pointer',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.375rem',
                        transition: 'all 0.3s ease',
                        color: isScrolled ? colors.text : colors.light,
                        ':hover': {
                            background: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                    }}
                    >
                        <span style={{ marginRight: '0.5rem', fontSize: '1.25rem' }}>👤</span>
                        Profile
                    </div>

                    <div onClick={handleLogout} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '1rem',
                        cursor: 'pointer',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.375rem',
                        transition: 'all 0.3s ease',
                        color: isScrolled ? colors.text : colors.light,
                        ':hover': {
                            background: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                    }}
                    >
                        Logout
                    </div>

                    <div onClick={handleCart} style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.375rem',
                        background: isScrolled ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` : 'rgba(255, 255, 255, 0.15)',
                        color: colors.light,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.3s ease',
                        ':hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                        }
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    >
                        <span style={{ marginRight: '0.5rem', fontSize: '1.25rem' }}>🛒</span>
                        Cart
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#FF5E62',
                            color: 'white',
                            borderRadius: '50%',
                            width: '1.5rem',
                            height: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 5px rgba(255, 94, 98, 0.5)',
                            border: '2px solid white',
                        }}>!</span>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Dropdown) */}
            <div style={{
                display: isMobileMenuOpen ? 'block' : 'none',
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                background: colors.transparent,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                borderBottomLeftRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
                padding: '1rem',
                zIndex: 1000,
                transition: 'all 0.3s ease',
                '@media (min-width: 769px)': {
                    display: 'none',
                }
            }}>
                {["Home", "Products", "Contact", "About", "Orders", "TasteLens", "Profile", "Cart", "Logout"].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            if (item === "Home") handleHomeClick();
                            else if (item === "Products") handleProductsClick();
                            else if (item === "Contact") handleContactClick();
                            else if (item === "About") handleAboutClick();
                            else if (item === "Orders") handleOrderClick();
                            else if (item === "TasteLens") handleTaste();
                            else if (item === "Profile") handleUprofile();
                            else if (item === "Cart") handleCart();
                            else if (item === "Logout") handleLogout();
                            setIsMobileMenuOpen(false);
                        }}
                        style={{
                            padding: '0.75rem 1rem',
                            borderBottom: index < 8 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                            color: colors.text,
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            ':hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            }
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        {item === "Profile" && <span style={{ marginRight: '0.5rem' }}>👤</span>}
                        {item === "Cart" && <span style={{ marginRight: '0.5rem' }}>🛒</span>}
                        {item === "TasteLens" && <span style={{ marginRight: '0.5rem' }}>✨</span>}
                        {item}
                        {item === "Cart" && (
                            <span style={{
                                background: '#FF5E62',
                                color: 'white',
                                borderRadius: '50%',
                                width: '1.25rem',
                                height: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                marginLeft: '0.5rem',
                            }}>3</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Water wave decoration */}
            <div style={{
                position: 'absolute',
                bottom: isScrolled ? '-15px' : '-25px',
                left: 0,
                width: '100%',
                height: '20px',
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff' fill-opacity='0.3'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: '1200px 100%',
                opacity: isScrolled ? 0.6 : 0.3,
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
            }}></div>
        </nav>
    );
};

export default Unavbar;