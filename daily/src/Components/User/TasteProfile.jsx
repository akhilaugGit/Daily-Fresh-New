import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const TasteProfile = () => {
    const navigate = useNavigate();
  
  const [preferences, setPreferences] = useState({
    tenderness: false,
    sweetness: false,
    saltiness: false,
    fishiness: false,
    texture: false,
    oiliness: false,
    acidity: false,
    metallic: false,
    mineral: false,
  });

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasteprofile/recommendations`, {
        preferences,
      });
      setRecommendedProducts(data.data);
      setError(""); // Clear any existing errors
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommended products. Please try again.");
    }
  };
  const handleBack = () => {
    navigate('/udashboard');
  };
  

  return (
    <div
    
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
      
    >
    <button
        onClick={handleBack}
        style={{
          alignSelf: 'flex-start',
          marginBottom: '20px',
          backgroundColor: '#6a0d',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        ⬅️ Back
      </button>
      <h1 style={{ textAlign: "center", color: "#333" }}>Taste Profile</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        {Object.keys(preferences).map((preference) => (
          <div
            key={preference}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <label
              style={{
                flex: 1,
                textTransform: "capitalize",
                color: "#555",
                fontSize: "16px",
              }}
            >
              <input
                type="checkbox"
                name={preference}
                checked={preferences[preference]}
                onChange={handleChange}
                style={{ marginRight: "10px", cursor: "pointer" }}
              />
              {preference.replace(/_/g, " ")}
            </label>
          </div>
        ))}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 0",
            backgroundColor: "#6200ea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#3700b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#6200ea")}
        >
          Submit
        </button>
      </form>
      {error && (
        <p
          style={{
            marginTop: "15px",
            color: "red",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
      {recommendedProducts.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#333" }}>Recommended Products</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}>
            {recommendedProducts.map((product) => (
              <div
                key={product.name}
                style={{
                  backgroundColor: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px"
                  }}
                />
                <h3 style={{ margin: "0", color: "#333" }}>{product.name}</h3>
                <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                  {product.description}
                </p>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto"
                }}>
                  <span style={{ fontWeight: "bold", color: "#2ecc71" }}>
                    ₹{product.price}
                  </span>
                  <span style={{
                    backgroundColor: `hsl(${product.matchPercentage}, 70%, 50%)`,
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px"
                  }}>
                    {product.matchPercentage}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasteProfile;
