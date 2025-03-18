import React, { useEffect, useState } from "react";
import Navbar from "./Unavbar/Unavbar";
import ProductCard from "./UproductCard/UproductCard";
import Footer from "./Footer/Footer";
import CarouselComponent from "./Carousel/CarouselComponent";
import axios from "axios";
import "./Style.css"; // Keep this import to maintain existing styles
import { useNavigate } from "react-router-dom";

const Udashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Base colors for light and dark mode
  const colors = {
    light: {
      primary: "#389246",
      secondary: "#64b5f6",
      text: "#2c3e50",
      textSecondary: "#546e7a",
      accent: "#ff6b6b",
      border: "#e0e6ed",
      shadow: "rgba(0, 0, 0, 0.1)",
      surfaceAlpha: "rgba(255, 255, 255, 0.9)",
      inputBg: "rgba(255, 255, 255, 0.9)"
    },
    dark: {
      primary: "#4a90e2",
      secondary: "#61dafb",
      text: "#e0e0e0",
      textSecondary: "#a0a0a0",
      accent: "#ff6b6b",
      border: "#333333",
      shadow: "rgba(0, 0, 0, 0.3)",
      surfaceAlpha: "rgba(30, 30, 30, 0.9)",
      inputBg: "rgba(40, 40, 40, 0.9)"
    }
  };

  // Current theme based on dark mode state
  const theme = darkMode ? colors.dark : colors.light;

  useEffect(() => {
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
        );

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

  const handleChatbotClick = () => {
    navigate("/chatbot");
  };

  // Common style variables for reusability
  const commonButtonStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "14px",
    letterSpacing: "0.3px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: `0 2px 8px ${theme.shadow}`,
    margin: "0 8px",
  };

  return (
    // Keep the main div classes to maintain the background image from CSS
    <div className={darkMode ? "dark-mode" : "light-mode"} style={{
      minHeight: "100vh",
      transition: "all 0.3s ease",
      fontFamily: "'Poppins', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      color: theme.text,
    }}>
      <Navbar />
      <CarouselComponent />

      {/* Main content container with improved spacing */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "20px",
      }}>
        {/* Top controls section */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          gap: "20px"
        }}>
          {/* Search Bar with enhanced styling */}
          <div style={{
            flex: "1",
            minWidth: "250px",
            maxWidth: "400px",
            position: "relative",
          }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                width: "100%",
                padding: "12px 20px 12px 45px",
                fontSize: "15px",
                borderRadius: "12px",
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.inputBg,
                color: theme.text,
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow: `0 4px 6px ${theme.shadow}`,
                backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23546e7a\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "15px center",
                backgroundSize: "18px",
              }}
            />
          </div>

          {/* Price Filter with elegant styling */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            position: "relative",
          }}>
            <label 
              htmlFor="priceFilter" 
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: theme.text,
              }}
            >
              Price
            </label>
            <div style={{
              position: "relative",
              display: "inline-block",
            }}>
              <select
                id="priceFilter"
                value={priceFilter}
                onChange={handlePriceFilterChange}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  padding: "10px 35px 10px 15px",
                  fontSize: "15px",
                  borderRadius: "8px",
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  cursor: "pointer",
                  boxShadow: `0 2px 4px ${theme.shadow}`,
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
              >
                <option value="">Sort by</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
              <div style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Dark Mode Toggle with modern styling */}
          <div style={{
            position: "relative",
            marginLeft: "10px",
          }}>
            <div 
              onClick={toggleDarkMode}
              style={{
                width: "50px",
                height: "26px",
                backgroundColor: darkMode ? theme.primary : theme.border,
                borderRadius: "13px",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                transform: darkMode ? "translateX(24px)" : "translateX(0)",
                transition: "transform 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}></div>
            </div>
            <span style={{
              position: "absolute",
              bottom: "-25px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "12px",
              fontWeight: "500",
              color: theme.textSecondary,
            }}>
              {darkMode ? "Dark" : "Light"}
            </span>
          </div>
        </div>

        {/* Category Filter Buttons with improved styling */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
        }}>
          <button
            onClick={() => setSelectedCategory("all")}
            style={{
              ...commonButtonStyle,
              backgroundColor: selectedCategory === "all" ? theme.primary : theme.surfaceAlpha,
              color: selectedCategory === "all" ? "#ffffff" : theme.text,
              transform: selectedCategory === "all" ? "translateY(-2px)" : "none",
              boxShadow: selectedCategory === "all" 
                ? `0 6px 12px ${theme.primary}40` 
                : `0 2px 8px ${theme.shadow}`,
              minWidth: "100px",
            }}
          >
            All Products
          </button>
          <button
            onClick={() => setSelectedCategory("fish")}
            style={{
              ...commonButtonStyle,
              backgroundColor: selectedCategory === "fish" ? theme.primary : theme.surfaceAlpha,
              color: selectedCategory === "fish" ? "#ffffff" : theme.text,
              transform: selectedCategory === "fish" ? "translateY(-2px)" : "none",
              boxShadow: selectedCategory === "fish" 
                ? `0 6px 12px ${theme.primary}40` 
                : `0 2px 8px ${theme.shadow}`,
              minWidth: "100px",
            }}
          >
            Fish
          </button>
          <button
            onClick={() => setSelectedCategory("poultry")}
            style={{
              ...commonButtonStyle,
              backgroundColor: selectedCategory === "poultry" ? theme.primary : theme.surfaceAlpha,
              color: selectedCategory === "poultry" ? "#ffffff" : theme.text,
              transform: selectedCategory === "poultry" ? "translateY(-2px)" : "none",
              boxShadow: selectedCategory === "poultry" 
                ? `0 6px 12px ${theme.primary}40` 
                : `0 2px 8px ${theme.shadow}`,
              minWidth: "100px",
            }}
          >
            Poultry
          </button>
        </div>

        {/* Results Summary */}
        <div style={{
          marginBottom: "20px",
          textAlign: "left",
          fontSize: "16px",
          color: theme.textSecondary,
          fontWeight: "500",
          backgroundColor: theme.surfaceAlpha,
          padding: "10px 16px",
          borderRadius: "8px",
          boxShadow: `0 2px 4px ${theme.shadow}`,
        }}>
          Showing {products.length} products 
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Product Grid with responsive layout - FIXED container to not exceed card size */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          margin: "0 auto",
        }}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              imageUrl={product.imageUrl}
              name={product.name}
              description={product.description}
              price={product.price}
              offer={product.offer}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: theme.surfaceAlpha,
                boxShadow: `0 6px 16px ${theme.shadow}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "50px 20px",
            color: theme.textSecondary,
            fontSize: "18px",
            backgroundColor: theme.surfaceAlpha,
            borderRadius: "12px",
            boxShadow: `0 4px 8px ${theme.shadow}`,
          }}>
            <div style={{
              marginBottom: "20px",
              fontSize: "48px",
            }}>🐟</div>
            <h3 style={{
              margin: "10px 0",
              fontWeight: "600",
            }}>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Chatbot Button with enhanced styling and animation */}
      <div   id="chat-bot-button"  // Add this ID

        onClick={handleChatbotClick}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `0 4px 20px ${theme.primary}80`,
          cursor: 'pointer',
          zIndex: '1000',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = `0 6px 26px ${theme.primary}90`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `0 4px 20px ${theme.primary}80`;
        }}
      >
        {/* Enhanced Chatbot Icon */}
        <div style={{
          position: 'relative',
          width: '26px',
          height: '26px',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="9" cy="10" r="1" fill="#ffffff"></circle>
            <circle cx="15" cy="10" r="1" fill="#ffffff"></circle>
          </svg>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Udashboard;