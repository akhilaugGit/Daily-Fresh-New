import React from "react";
import  { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './About.css';  // Assuming you will put the CSS in About.css

const About = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUdashboard = () => {
    navigate('/udashboard');  // Pass totalPrice to Buy component
  };

  return (
    <div className="about-container">
      <button onClick={handleUdashboard}>
        ⬅️ Back
      </button>
      
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-wrapper">
          <div></div>
        </div>
      </div>

      {/* About Section */}
      <div className="section about-section">
        <div className="section-wrapper">
          <h2>About Akhil Augustine</h2>
          
          <div className="experience-cards">
            {/* Experience Card 1 */}
            <div className="experience-card">
              <img src="./orion-logo.png" alt="Orion Innovation" className="company-logo" />
              <div className="card-content">
                <h3>Associate Software Engineer</h3>
                <p>Orion Innovation, Infopark Kochi</p>
                <p>2022 - 2023</p>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div className="experience-card">
              <img src="./prime-edumate-logo.png" alt="Prime Edumate" className="company-logo" />
              <div className="card-content">
                <h3>Digital Marketing Manager</h3>
                <p>Prime Edumate</p>
                <p>Year</p>
              </div>
            </div>
          </div>

          <div className="linkedin-link">
            <a href="https://www.linkedin.com/in/akhilaugustine" target="_blank" rel="noopener noreferrer">
              Visit my LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer Section (Optional, remove if not needed) */}
      <div className="section footer">
        <div className="section-wrapper">
          <div>
            <div className="profile-image-border">
              <div className="profile-image"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
