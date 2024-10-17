import React, { useEffect, useState } from 'react';
import Navbar from './Unavbar/Unavbar';
import ProductCard from './UproductCard/UproductCard';
import Footer from './Footer/Footer';
import CarouselComponent from './Carousel/CarouselComponent';
import axios from 'axios';
import './Style.css';

const Udashboard = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all'); // State to track selected category
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    console.log(products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/product/view-product');
                setProducts(response.data);
                setFilteredProducts(response.data); // Initially show all products
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };
        fetchProducts();
    }, []);

    const filterProducts = (category) => {
        let updatedProducts = products;

        if (category !== 'all') {
            updatedProducts = updatedProducts.filter((product) => product.category === category);
        }

        if (searchQuery) {
            updatedProducts = updatedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
        setSelectedCategory(category);
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        filterProducts(selectedCategory); // Re-filter based on selected category and new search query
    };

    return (
        <div>
            <Navbar />
            <CarouselComponent />
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="🔎"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Filter Buttons */}
            <div className="fbuttons">
                <button 
                    className={`fbtn ${selectedCategory === 'fish' ? 'active' : ''}`} 
                    onClick={() => filterProducts('fish')}
                >
                    Fish
                </button>
                <button 
                    className={`fbtn ${selectedCategory === 'poultry' ? 'active' : ''}`} 
                    onClick={() => filterProducts('poultry')}
                >
                    Poultry
                </button>
                <button 
                    className={`fbtn ${selectedCategory === 'all' ? 'active' : ''}`} 
                    onClick={() => filterProducts('all')}
                >
                    Show All
                </button>
            </div>

            {/* Display filtered products */}
            <div className="product-container">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        productId={product._id} // Pass productId here
                        imageUrl={product.imageUrl}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        category={product.category}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Udashboard;
