import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Uprofile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const parallaxRef = useRef(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch user details from the API when the component mounts
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, unable to fetch profile');
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleUdashboard = () => {
    navigate('/udashboard');
  };

  // Common styles for animations
  const fadeInAnimation = {
    animation: 'fadeIn 0.8s ease-in-out',
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    }
  };

  // Fish-themed colors
  const oceanBlue = 'rgba(117, 27, 121, 0.95)';
  const lightAqua = 'rgb(189, 112, 243)';
  const deepBlue = 'rgba(93, 12, 122, 0.92)';
  const transparentBlue = 'rgba(0, 125, 161, 0.1)';

  // Main container style
  const profileContainerStyle = {
    padding: '2rem',
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${oceanBlue} 0%, ${deepBlue} 100%)`,
    color: 'white',
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Parallax background elements
  const parallaxBackground = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none'
  };

  const bubbleStyle = {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 8s infinite ease-in-out',
    '@keyframes float': {
      '0%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-20px)' },
      '100%': { transform: 'translateY(0)' }
    }
  };

  // Profile card style
  const profileCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    zIndex: 2,
    marginTop: '2rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',
    ...fadeInAnimation
  };

  // Profile heading style
  const profileHeadingStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '2rem',
    textAlign: 'center',
    background: `linear-gradient(90deg, white, ${lightAqua})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative'
  };

  // Decoration element
  const decorationStyle = {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '3px',
    background: `linear-gradient(90deg, transparent, ${lightAqua}, transparent)`,
    borderRadius: '10px'
  };

  // Back button style
  const backButtonStyle = {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: 'white',
    padding: '0.8rem 1.6rem',
    borderRadius: '50px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    backdropFilter: 'blur(5px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 5
  };

  // Profile info item style
  const infoItemStyle = {
    marginBottom: '1.5rem',
    padding: '1.2rem',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(5px)',
    transition: 'transform 0.3s ease, background 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  // Icon container style
  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    fontSize: '1.2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  // Fish illustration style
  const fishIllustrationStyle = {
    position: 'absolute',
    bottom: '-100px',
    right: '-80px',
    width: '300px',
    height: '300px',
    opacity: 0.1,
    zIndex: 1,
    transform: 'rotate(10deg)',
    pointerEvents: 'none'
  };

  // Fish SVG content
  const fishSvgContent = `
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="white" d="M256,16C385.3,16,496,126.7,496,256S385.3,496,256,496,16,385.3,16,256,126.7,16,256,16M403.5,294.5
      c23.6-23.6,23.6-61.9,0-85.5s-61.9-23.6-85.5,0c-23.6,23.6-23.6,61.9,0,85.5S379.9,318.1,403.5,294.5M128,256
      c0-17.7,14.3-32,32-32s32,14.3,32,32-14.3,32-32,32S128,273.7,128,256"/>
    </svg>
  `;

  // Water wave animation at the bottom
  const waterWaveStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '150px',
    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230c5b7a' fill-opacity='0.3' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom center`,
    backgroundSize: 'cover',
    zIndex: 1
  };

  if (loading) {
    return (
      <div style={{
        ...profileContainerStyle,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: lightAqua,
          borderRadius: '50%',
          animation: 'spin 1s infinite linear',
          '@keyframes spin': {
            to: { transform: 'rotate(360deg)' }
          }
        }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        ...profileContainerStyle,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 87, 87, 0.2)',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 87, 87, 0.3)'
        }}>
          <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>⚠️</span>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={handleUdashboard}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              padding: '0.8rem 1.6rem',
              borderRadius: '50px',
              cursor: 'pointer',
              marginTop: '1.5rem',
              backdropFilter: 'blur(5px)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={profileContainerStyle}>
      {/* Parallax background elements */}
      <div ref={parallaxRef} style={parallaxBackground}>
        {/* Decorative bubbles */}
        <div style={{
          ...bubbleStyle,
          width: '100px',
          height: '100px',
          top: '20%',
          left: '10%',
          animationDelay: '0s'
        }}></div>
        <div style={{
          ...bubbleStyle,
          width: '70px',
          height: '70px',
          top: '40%',
          right: '15%',
          animationDelay: '1s'
        }}></div>
        <div style={{
          ...bubbleStyle,
          width: '50px',
          height: '50px',
          bottom: '30%',
          left: '20%',
          animationDelay: '2s'
        }}></div>
        <div style={{
          ...bubbleStyle,
          width: '120px',
          height: '120px',
          bottom: '20%',
          right: '5%',
          animationDelay: '3s',
          opacity: 0.05
        }}></div>

        {/* Oceanic shapes */}
        <div 
          style={{
            position: 'absolute',
            top: '5%',
            right: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 125, 161, 0.2) 0%, rgba(0, 125, 161, 0) 70%)',
            animation: 'pulse 10s infinite ease-in-out',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.2)' },
              '100%': { transform: 'scale(1)' }
            }
          }}
        ></div>
      </div>

      {/* Water wave animation */}
      <div style={waterWaveStyle}></div>

      {/* Back button */}
      <button 
        onClick={handleUdashboard} 
        style={backButtonStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span style={{fontSize: '1.2rem'}}>⬅️</span> Back to Dashboard
      </button>

      {/* Profile card */}
      <div 
        style={profileCardStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.25)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        }}
      >
        <h2 style={profileHeadingStyle}>
          Welcome, {user.username}
          <div style={decorationStyle}></div>
        </h2>

        {/* User info */}
        <div style={{
          ...infoItemStyle,
          animationDelay: '0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateX(5px)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }}
        >
          <div style={iconContainerStyle}>👤</div>
          <div>
            <div style={{
              fontSize: '0.85rem',
              opacity: 0.7,
              marginBottom: '4px'
            }}>Username</div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>{user.username}</div>
          </div>
        </div>

        <div style={{
          ...infoItemStyle,
          animationDelay: '0.4s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateX(5px)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }}
        >
          <div style={iconContainerStyle}>📩</div>
          <div>
            <div style={{
              fontSize: '0.85rem',
              opacity: 0.7,
              marginBottom: '4px'
            }}>Email Address</div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>{user.email}</div>
          </div>
        </div>

        {/* Quick actions section */}
        <div style={{
          marginTop: '3rem',
          padding: '1.2rem',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          animationDelay: '0.6s',
          ...fadeInAnimation
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            marginBottom: '1rem',
            opacity: 0.9
          }}></h3>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.2rem',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              flex: '1 0 auto',
              minWidth: '120px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              
            </button>
            
            <button style={{
              background: 'rgba(163, 247, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.2rem',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              flex: '1 0 auto',
              minWidth: '120px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(163, 247, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(163, 247, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
             
            </button>
            
            <button style={{
              background: 'rgba(163, 247, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.2rem',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              flex: '1 0 auto',
              minWidth: '120px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(163, 247, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(163, 247, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              
            </button>
          </div>
        </div>

        {/* Fish illustration */}
        <div style={fishIllustrationStyle} dangerouslySetInnerHTML={{ __html: fishSvgContent }}></div>
      </div>
    </div>
  );
};

export default Uprofile;