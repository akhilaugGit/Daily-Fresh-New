import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const FarmerAddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImage] = useState("");
  const [category, setCategory] = useState("fish");
  const [subcategory, setSubcategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    // Validate price
    if (price <= 0) {
      setErrorMessage("Price must be greater than 0.");
      return;
    }
    if (price > 100000) {
      setErrorMessage("Price cannot exceed 100,000.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("image", imageUrl);
      formData.append("stock", stock);

      console.log({ name, description, price, imageUrl, category, subcategory, stock }); // For debugging

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);

      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage("");
    } catch (error) {
      console.error("There was an error adding the product!", error);
      setErrorMessage(
        "There was an error adding the product. Please try again."
      );
    }
  };

  const imageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleHomeClick = () => {
    navigate("/farmer-dashboard"); // Changed to farmer-dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <span onClick={handleHomeClick} style={{ cursor: "pointer" }}>
        🏡 Farmer Dashboard
      </span>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="1"
        max="100000"
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        min="50"
        max="1000"
      />
      <input
        type="file"
        placeholder="Image URL"
        onChange={imageUpload}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="poultry">Poultry</option>
      </select>
      
      
      <input
        type="text"
        placeholder={`Enter ${category} type`}
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        required
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default FarmerAddProduct;