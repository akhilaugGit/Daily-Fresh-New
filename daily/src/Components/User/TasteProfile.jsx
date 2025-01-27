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
    <div>
      <h1>Taste Profile</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(preferences).map((preference) => (
          <div key={preference}>
            <label>
              <input
                type="checkbox"
                name={preference}
                checked={preferences[preference]}
                onChange={handleChange}
              />
              {preference.charAt(0).toUpperCase() + preference.slice(1)}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recommendedProducts.length > 0 && (
        <div>
          <h2>Recommended Products</h2>
          <ul>
            {recommendedProducts.map((product) => (
              <li key={product._id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TasteProfile;
