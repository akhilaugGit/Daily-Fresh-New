import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap'; 
import '../Style.css'; 

// Importing images correctly
import homeImage from '../../../../assets/courosel/one.webp';
import underImage from '../../../../assets/courosel/two.webp';
import plateImage from '../../../../assets/courosel/four.webp';

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
                    </BootstrapCarousel.Item>
                </BootstrapCarousel>
            </div>
        </div>
    );
};

export default CarouselComponent;
