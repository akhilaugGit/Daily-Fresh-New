import React from 'react';
import { useNavigate } from 'react-router-dom';
import logosImage from '../../assets/file.png';

const Dnavbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    
    const handleUprofile = () => {
        navigate('/duprofile');
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

    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1a4a8d',
            padding: '10px 20px',
            width: '100%',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            boxSizing: 'border-box',
        },
        logoContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        logoSmall: {
            width: '40px',
            height: '40px',
            marginRight: '10px',
        },
        logoText: {
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        navbarItems: {
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
        },
        icons: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            color: '#fff',
        },
        navLink: {
            cursor: 'pointer',
            color: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            marginRight: '5px',
        }
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <img style={styles.logoSmall} src={logosImage} alt="Logo" />
                <div style={styles.logoText}>Daily Fresh</div>
            </div>
            <div style={styles.navbarItems}>
                {/* You can add menu items here if needed */}
            </div>
            <div style={styles.icons}>
                <span 
                    style={styles.navLink} 
                    id="prf" 
                    onClick={handleUprofile}
                >
                    Profile
                </span>
                <span style={styles.icon}>👤</span>
                <span 
                    style={styles.navLink} 
                    onClick={handleLogout}
                >
                    Logout
                </span>
            </div>
        </nav>
    );
};

export default Dnavbar;