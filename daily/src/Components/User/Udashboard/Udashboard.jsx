import React, { useEffect, useState } from "react";
import Navbar from "./Unavbar/Unavbar";
import ProductCard from "./UproductCard/UproductCard";
import Footer from "./Footer/Footer";
import CarouselComponent from "./Carousel/CarouselComponent";
import axios from "axios";
import "./Style.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Udashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Your existing useEffect and handler functions...
  useEffect(() => {
    // Fetch products when component mounts and whenever selectedCategory, searchQuery, or priceFilter changes
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/view-product`,
          {
            params: {
              name: searchQuery,
              category:
                selectedCategory === "all" ? undefined : selectedCategory,
            },
          }
        );
        let visibleProducts = response.data.filter(
          (product) => !product.isDisabled
        ); // Filter disabled products

        // Sort products based on the selected price filter
        if (priceFilter === "lowToHigh") {
          visibleProducts = visibleProducts.sort((a, b) => a.price - b.price);
        } else if (priceFilter === "highToLow") {
          visibleProducts = visibleProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(visibleProducts);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, priceFilter]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add a new function to handle chatbot navigation
  const handleChatbotClick = () => {
    navigate("/chatbot"); // Navigate to the chatbot page
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Navbar />
      <CarouselComponent />

      {/* Dark Mode Toggle Button */}
      <div className="toggle-container">
        <label className="dark-mode-toggle">
          <p style={{ color: 'white' }}>Dark</p>
          <input 
            type="checkbox" 
            onChange={toggleDarkMode} 
            checked={darkMode} 
            style={{ display: 'none' }}
          />
        </label>
      </div>

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
          className={`fbtn ${selectedCategory === "fish" ? "active" : ""}`}
          onClick={() => setSelectedCategory("fish")}
        >
          Fish
        </button>
        <button
          className={`fbtn ${selectedCategory === "poultry" ? "active" : ""}`}
          onClick={() => setSelectedCategory("poultry")}
        >
          Poultry
        </button>
        <button
          className={`fbtn ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          Show All
        </button>
      </div>

      {/* Price Filter Dropdown */}
      <div className="price-filter">
        <label htmlFor="priceFilter">Price💰</label>
        <select
          id="priceFilter"
          value={priceFilter}
          onChange={handlePriceFilterChange}
        >
          <option value="">None</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Display filtered products */}
      <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            productId={product._id}
            imageUrl={product.imageUrl}
            name={product.name}
            description={product.description}
            price={product.price}
            offer={product.offer}
          />
        ))}
      </div>

      {/* Add Chatbot Floating Button */}
      <div 
        onClick={handleChatbotClick}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: darkMode ? '#4a90e2' : '#2979ff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          zIndex: '1000',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Chatbot Icon - using CSS to create a simple chat bubble icon */}
        <div style={{
          position: 'relative',
          width: '30px',
          height: '30px'
        }}>
          <div style={{
            position: 'absolute',
            width: '26px',
            height: '26px',
            borderRadius: '50% 50% 50% 0',
            backgroundColor: 'white',
            transform: 'rotate(-45deg)',
            top: '2px',
            left: '2px'
          }}></div>
          <div style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: darkMode ? '#4a90e2' : '#2979ff',
            top: '12px',
            left: '10px'
          }}></div>
          <div style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: darkMode ? '#4a90e2' : '#2979ff',
            top: '12px',
            right: '10px'
          }}></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Udashboard;