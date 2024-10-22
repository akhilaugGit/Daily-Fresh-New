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

  useEffect(() => {
    // Fetch products when component mounts and whenever selectedCategory or searchQuery changes
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/product/view-product",
          {
            params: {
              name: searchQuery,
              category:
                selectedCategory === "all" ? undefined : selectedCategory,
            },
          }
        );
        const visibleProducts = response.data.filter(
          (product) => !product.isDisabled
        ); // Filter disabled products
        setProducts(visibleProducts);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]); // Run this effect when selectedCategory or searchQuery changes

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
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

      {/* Display filtered products */}
      <div className="product-container">
        {products.map((product) => (
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
