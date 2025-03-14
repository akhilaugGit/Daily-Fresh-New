import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fade in animation when component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Handle scroll events for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', fontFamily: '"Montserrat", sans-serif' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollPosition * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 1,
        }} />
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 2 }} />
        
        <div style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          textAlign: 'center',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.5s ease, transform 1.5s ease',
        }}>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '20px', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Daily FRESH
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 300, maxWidth: '800px', marginBottom: '40px', letterSpacing: '0.05em' }}>
            Premium fish and poultry sourced from the finest farms and waters around the world
          </p>
          <Link to="/register" className="cta-button">DIVE IN</Link>
          
          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <span style={{ display: 'block', marginBottom: '10px' }}>Scroll to explore</span>
            <div className="scroll-indicator"></div>
          </div>
        </div>
      </div>

      {/* Section 1 - Fresh Fish */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${(scrollPosition - window.innerHeight) * 0.3}px)`,
          zIndex: 1,
        }} />
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 2 }} />
        
        <div style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '20px' }}>
            FRESH SEAFOOD
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 300, maxWidth: '800px', marginBottom: '20px', letterSpacing: '0.05em' }}>
            Wild-caught and sustainably farmed fish from the world's cleanest waters
          </p>
        </div>
      </div>

      {/* Section 2 - Poultry */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.pexels.com/photos/27083552/pexels-photo-27083552/free-photo-of-flock-of-chickens.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${(scrollPosition - window.innerHeight * 2) * 0.3}px)`,
          zIndex: 1,
        }} />
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 2 }} />
        
        <div style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '20px' }}>
            PREMIUM POULTRY
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 300, maxWidth: '800px', marginBottom: '20px', letterSpacing: '0.05em' }}>
            Free-range, organic poultry raised without antibiotics or hormones
          </p>
        </div>
      </div>

      {/* Section 3 - Farm to Table */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${(scrollPosition - window.innerHeight * 3) * 0.3}px)`,
          zIndex: 1,
        }} />
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 2 }} />
        
        <div style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '20px' }}>
            FARM TO TABLE
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 300, maxWidth: '800px', marginBottom: '20px', letterSpacing: '0.05em' }}>
            From our trusted producers to your kitchen within 24 hours
          </p>
        </div>
      </div>

      <style jsx>{`
        .cta-button {
          position: relative;
          display: inline-block;
          padding: 18px 50px;
          background-color: transparent;
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-decoration: none;
          border: 2px solid #ffffff;
          border-radius: 3px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          background-color: #ffffff;
          color: #000000;
        }
        
        .scroll-indicator {
          width: 30px;
          height: 50px;
          border: 2px solid #ffffff;
          border-radius: 15px;
          position: relative;
        }
        
        .scroll-indicator:after {
          content: '';
          display: block;
          position: absolute;
          top: 10px;
          left: 50%;
          width: 4px;
          height: 8px;
          margin-left: -2px;
          background-color: #ffffff;
          border-radius: 2px;
          animation: scrollAnimation 1.5s infinite;
        }
        
        @keyframes scrollAnimation {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Home;