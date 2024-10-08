import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import ProductType from './ProductType/ProductType';
import ProductCard from './ProductCard/ProductCard';
import Footer from './Footer/Footer';
import CarouselComponent from './Carousel/CarouselComponent';
import axios from 'axios';
import './Style.css';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api');
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <CarouselComponent />
            <ProductType />

            {/* Display products dynamically */}
            <div className="product-container">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        category={product.category} // Adding category display
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
