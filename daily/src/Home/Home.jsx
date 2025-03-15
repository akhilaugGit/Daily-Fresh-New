import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    // Fade in animation when component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Handle scroll events for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Animation timer for continuous fin movement
    const animationTimer = setInterval(() => {
      setAnimationTime(prev => prev + 1);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearInterval(animationTimer);
    };
  }, []);

  // Calculate fish position based on scroll
  const fishYPosition = Math.min(scrollPosition * 1.5, window.innerHeight * 3);
  const fishOpacity = scrollPosition < window.innerHeight * 2 ? 1 : Math.max(0, 1 - (scrollPosition - window.innerHeight * 2) / 400);
  const fishRotation = Math.min(45, -scrollPosition / 20);  
  // Calculate bubble positions (only show if scrolling)
  const showBubbles = scrollPosition > 100 && scrollPosition < window.innerHeight * 2.5;
  
  // Fish fin animation values based on animationTime
  const tailWag = Math.sin(animationTime * 0.4) * 10;
  const finWave = Math.sin(animationTime * 0.3) * 5;

  // Professional chick animation values
const chickHorizontalPosition = Math.sin(scrollPosition * 0.002) * (window.innerWidth * 0.35);
const chickVerticalPosition = window.innerHeight * 0.25; // Fixed at 25% of screen height
const chickOpacity = Math.min(1, scrollPosition / 200) * Math.max(0, 1 - (scrollPosition - window.innerHeight * 2) / 500);
const wingFlapSpeed = 0.4 + Math.abs(Math.cos(scrollPosition * 0.002)) * 0.2; // Wing speed varies with direction
const wingFlapAmplitude = Math.sin(animationTime * wingFlapSpeed) * 6;

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', fontFamily: '"Montserrat", sans-serif' }}>
      {/* Fish Animation Element */}
      <div style={{
        position: 'fixed',
        left: '50%',
        top: fishYPosition < window.innerHeight ? '10%' : `${Math.min(70, 10 + (fishYPosition/window.innerHeight) * 20)}%`,
        transform: `translateX(-50%) rotate(${fishRotation}deg)`,
        zIndex: 10,
        opacity: fishOpacity,
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none',
      }}>
        <svg width="150" height="80" viewBox="0 0 150 80">
          {/* Fish body with subtle pulse */}
          <path 
            d={`M110,40 C${90 + Math.sin(animationTime * 0.2) * 2},${15 + Math.sin(animationTime * 0.1) * 2} 70,5 30,10 C20,15 10,25 10,40 C10,55 20,65 30,70 C70,${75 + Math.sin(animationTime * 0.1) * 2} ${90 + Math.sin(animationTime * 0.2) * 2},65 110,40 Z`} 
            fill="#f0f0f0" 
            stroke="#ffffff" 
            strokeWidth="1" 
          />
          
          {/* Eye */}
          <circle cx="25" cy="35" r="4" fill="#000000" />
          <circle cx="25" cy="35" r="1" fill="#ffffff" />
          
          {/* Tail fin with wag animation */}
          <path 
            d={`M110,40 L${140 + tailWag},20 L${140 - tailWag},60 Z`} 
            fill="#f0f0f0" 
            stroke="#ffffff" 
            strokeWidth="1"
          />
          
          {/* Top fin with wave animation */}
          <path 
            d={`M60,10 Q70,${5 - finWave} 80,10 Q90,${5 + finWave} 100,10`} 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2"
          />
          
          {/* Bottom fin with wave animation */}
          <path 
            d={`M60,70 Q70,${75 + finWave} 80,70 Q90,${75 - finWave} 100,70`} 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2"
          />
          
          {/* Gill */}
          <path 
            d="M30,30 Q32,40 30,50" 
            fill="none" 
            stroke="#cccccc" 
            strokeWidth="1"
          />
        </svg>
        
{/* Professional Chick Animation Element */}
{scrollPosition > 50 && (
  <div style={{
    position: 'fixed',
    left: `calc(50% + ${chickHorizontalPosition}px)`,
    top: `${chickVerticalPosition}px`,
    transform: `translateX(-50%) scaleX(${Math.cos(scrollPosition * 0.002) > 0 ? -1 : 1})`, // Face direction of travel
    zIndex: 5, // Below fish
    opacity: chickOpacity,
    pointerEvents: 'none',
  }}>
    <svg width="90" height="70" viewBox="0 0 90 70">
      {/* Wing with professional flapping animation */}
      <path 
        d={`M45,30 Q55,${32 - wingFlapAmplitude} 60,40`} 
        fill="#FFDE59" 
        stroke="#FFD700" 
        strokeWidth="1.2"
        opacity="0.9"
      />
      
      {/* Chick body with subtle breathing */}
      <ellipse 
        cx="45" 
        cy="40" 
        rx={`${22 + Math.sin(animationTime * 0.15) * 0.8}`} 
        ry={`${19 + Math.sin(animationTime * 0.12) * 0.8}`} 
        fill="#FFDE59" 
        stroke="#FFD700" 
        strokeWidth="1" 
      />
      
      {/* Chick head */}
      <circle 
        cx="25" 
        cy="30" 
        r="13" 
        fill="#FFDE59" 
        stroke="#FFD700" 
        strokeWidth="1" 
      />
      
      {/* Eye with shine */}
      <circle cx="21" cy="27" r="3" fill="#000000" />
      <circle cx="22" cy="26" r="1" fill="#ffffff" />
      
      {/* Beak */}
      <path 
        d="M14,30 L8,32 L14,34" 
        fill="#FF9900" 
        stroke="#FF7700" 
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      
      {/* Tail feathers */}
      <path 
        d={`M67,40 Q75,${35 + Math.sin(animationTime * 0.2) * 1.5} 72,45`} 
        fill="#FFDE59" 
        stroke="#FFD700" 
        strokeWidth="1"
      />
      
      {/* Legs with subtle movement */}
      <path 
        d={`M35,${56 + Math.sin(animationTime * 0.25) * 0.7} L33,64 M50,${56 + Math.sin((animationTime + 2) * 0.25) * 0.7} L52,64`} 
        fill="none" 
        stroke="#FF9900" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
)}
        
        {/* Bubbles trail */}
        {showBubbles && (
          <div style={{ position: 'absolute', right: '10px', top: '-40px' }}>
            <div style={{ 
              position: 'absolute', 
              width: '10px', 
              height: '10px', 
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.7)',
              borderRadius: '50%',
              right: Math.sin(animationTime * 0.3) * 10,
              top: -((animationTime % 20) * 3),
              opacity: 1 - ((animationTime % 20) / 20),
            }}></div>
            <div style={{ 
              position: 'absolute', 
              width: '6px', 
              height: '6px', 
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.7)',
              borderRadius: '50%',
              right: 10 + Math.sin((animationTime + 10) * 0.3) * 5,
              top: -((animationTime % 15) * 2),
              opacity: 1 - ((animationTime % 15) / 15),
            }}></div>
            <div style={{ 
              position: 'absolute', 
              width: '4px', 
              height: '4px', 
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.7)',
              borderRadius: '50%',
              right: 5 + Math.sin((animationTime + 5) * 0.3) * 8,
              top: -((animationTime % 25) * 1.5),
              opacity: 1 - ((animationTime % 25) / 25),
            }}></div>
          </div>
        )}
      </div>

      {/* Small water splash at top of page that appears during initial dive */}
      {scrollPosition > 50 && scrollPosition < 300 && (
        <div style={{
          position: 'fixed',
          left: '50%',
          top: '15%', 
          transform: 'translateX(-50%)',
          zIndex: 10,
          opacity: Math.min(1, (scrollPosition - 50) / 100) * (1 - (scrollPosition - 150) / 150),
          pointerEvents: 'none',
        }}>
          <svg width="100" height="30" viewBox="0 0 100 30">
            <path 
              d={`M50,0 C${45 + Math.sin(animationTime * 0.8) * 5},10 ${30 + Math.sin(animationTime * 0.6) * 3},15 20,20 C${10 + Math.sin(animationTime * 0.7) * 2},25 5,20 0,30 L100,30 C95,20 ${90 + Math.sin(animationTime * 0.7) * 2},25 80,20 C${70 + Math.sin(animationTime * 0.6) * 3},15 ${55 + Math.sin(animationTime * 0.8) * 5},10 50,0 Z`}
              fill="rgba(255,255,255,0.5)" 
            />
          </svg>
        </div>
      )}

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

      {/* Rest of the sections remain unchanged */}
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