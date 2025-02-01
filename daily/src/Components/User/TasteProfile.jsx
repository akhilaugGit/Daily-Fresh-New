import React, { useState } from "react";
import axios from "axios";

const TasteProfile = () => {
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

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
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
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {recommendedProducts.map((product) => (
              <li
                key={product._id}
                style={{
                  backgroundColor: "#fff",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TasteProfile;
