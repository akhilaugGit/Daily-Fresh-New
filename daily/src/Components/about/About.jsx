import React from 'react';
import './About.css'; // For custom styling

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>Daily Fresh</h1>
        <p className="tagline">Quick Commerce: The New Era</p>
      </header>

      <section className="market-insights">
        <h2>Market Insights: Quick Commerce in India</h2>
        <p>
          Quick commerce has revolutionized the retail industry, enabling customers to receive essential goods in record time. With a rapidly growing market, India is at the forefront of this change.
        </p>
        <div className="graph-section">
          <img 
            src="market-insights-graph.jpg" 
            alt="Market Insights Graph" 
            className="graph-image"
          />
          <p className="graph-caption">
            Market share of Quick Commerce companies in India (2024)
          </p>
          <ul className="market-players">
           
          </ul>
        </div>
      </section>

      <section className="about-daily-fresh">
        <h2>About Daily Fresh</h2>
        <p>
          At Daily Fresh, we are dedicated to bringing fresh produce and groceries to your doorstep within minutes. Our innovative approach combines advanced logistics and a customer-centric platform to meet your daily needs efficiently and sustainably.
        </p>
        <p>
          Whether it’s early morning essentials or last-minute ingredients for dinner, Daily Fresh ensures you never have to compromise on quality or time.
        </p>
      </section>

      <section className="founder-section">
        <h2>Meet Our Founder</h2>
        <div className="founder-container">
          <img 
            src="founder-cutout.jpg" 
            alt="Founder of Daily Fresh" 
            className="founder-image" 
          />
          <div className="founder-details">
            <h3>Your Name</h3>
            <p>
              As the visionary behind Daily Fresh, I am passionate about transforming the grocery shopping experience. With a background in technology and a keen interest in logistics, I aim to bridge the gap between convenience and quality in the quick commerce industry.
            </p>
            <p>
              My journey from ideation to execution has been fueled by a commitment to sustainability, innovation, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
