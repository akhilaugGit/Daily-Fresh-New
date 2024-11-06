import React, { useEffect, useState } from "react";
import Navbar from "./Unavbar/Unavbar";
import ProductCard from "./UproductCard/UproductCard";
import Footer from "./Footer/Footer";
import CarouselComponent from "./Carousel/CarouselComponent";
import axios from "axios";
import "./Style.css";

const Udashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // State to track selected category
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [priceFilter, setPriceFilter] = useState(""); // State for price filter
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

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
  }, [selectedCategory, searchQuery, priceFilter]); // Run this effect when selectedCategory, searchQuery, or priceFilter changes

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value); // Update the price filter state
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle the dark mode state
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
            style={{ display: 'none' }} // Hide the default checkbox
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

      <Footer />
    </div>
  );
};

export default Udashboard;
