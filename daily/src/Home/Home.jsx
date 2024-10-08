import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import fishImage from '../assets/fishic.png'; // Replace with the path to your fish image
import fishImagei from '../assets/fishic2.png'; // Replace with the path to your fish image
import platefish from '../assets/platefish.jpg'; // Replace with the path to your


const Home = () => {
  return (
    <div className="home-container">
      {/* Section 1: Fisherman in a boat */}
      <section className="parallax-section parallax1">
        <div className="content">
          <h1>From Waves</h1>
       
        <Link to="/register" className="btn btn-default border" type="button">
              Register
            </Link>
            </div>
      </section>

      

      {/* Section 3: Fish falling effect */}
      <section className="parallax-section parallax3">
      <div className="content">
          <h1>to Plates</h1>
        </div>
      </section>

      {/* Fixed fish image */}
      
    </div>
  );
};

export default Home;
