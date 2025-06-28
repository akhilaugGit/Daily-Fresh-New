import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap'; 
import '../Style.css'; 

// Importing images correctly
import homeImage from '../../../../assets/courosel/prince1.png';
import underImage from '../../../../assets/courosel/prin2.png';
import plateImage from '../../../../assets/courosel/prince3.png';
import ad10 from '../../../../assets/courosel/ten.gif';

const CarouselComponent = () => {
    return (
        <div className="carousel-wrapper">
            <div className="carousel-container">
                <BootstrapCarousel interval={2000}> {/* 2000ms = 2 seconds between slides */}
                    <BootstrapCarousel.Item>
                        <img className="d-block w-100" src={homeImage} alt="First slide" />
                    </BootstrapCarousel.Item>
                    <BootstrapCarousel.Item>
                        <img className="d-block w-100" src={underImage} alt="Second slide" />
                    </BootstrapCarousel.Item>
                    <BootstrapCarousel.Item>
                        <img className="d-block w-100" src={plateImage} alt="Third slide" />
                        <span style={{ color: 'yellow' }}>Advertisment</span>

                    </BootstrapCarousel.Item>
                    
                </BootstrapCarousel>
            </div>
        </div>
    );
};

export default CarouselComponent;
