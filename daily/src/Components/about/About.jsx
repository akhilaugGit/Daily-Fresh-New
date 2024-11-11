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
          <h2>Experinece</h2>
          
          <div className="experience-cards">
            {/* Experience Card 1 */}
            <div className="experience-card">
    <div className="company-logo1" />
    <div className="card-content">
      <h3>Associate Software Engineer</h3>
      <h3>Orion Innovation, Infopark Kochi</h3>
      <p>full-time</p>
      <p>2022 - 2023</p>

              </div>
            </div>

            {/* Experience Card 2 */}
            <div className="experience-card">
            <div className="company-logo2" />
            <div className="card-content">
                <h3>Digital Marketing Manager</h3>
                <h3>Prime Edumate</h3>
                <p>part-time</p>
                <p>2024</p>

                </div>
            </div>
          </div>

          <div className="linkedin-link">
            <a href="https://www.linkedin.com/in/akhil--augustine/" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>



      <div className="section about-section">
      <div className="company-logo3" />
      <div className="company-logo4" />


        <div className="section-wrapper">
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
