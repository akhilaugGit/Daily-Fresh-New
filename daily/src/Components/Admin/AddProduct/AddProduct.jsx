import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImage] = useState("");
  const [category, setCategory] = useState("fish"); // Default category
  const [subcategory, setSubcategory] = useState("");
  const [offer, setOffer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateText = (text) => {
    return /^[A-Za-z\s]+$/.test(text); // Ensures only letters and spaces are allowed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateText(name)) {
      setErrorMessage("Product name must not contain numbers or special characters.");
      return;
    }
    if (!validateText(description)) {
      setErrorMessage("Description must not contain numbers or special characters.");
      return;
    }
    if (price <= 0 || price > 100000) {
      setErrorMessage("Price must be between 1 and 100,000.");
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
      formData.append("offer", offer);

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
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage("");
      setCategory("fish");
      setOffer("");
      setSubcategory("");
    } catch (error) {
      setErrorMessage("There was an error adding the product. Please try again.");
    }
  };

  const imageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <span onClick={handleHomeClick} style={{ cursor: "pointer" }}>🏛️Home</span>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => validateText(e.target.value) && setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => validateText(e.target.value) && setDescription(e.target.value)}
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
        min="1"
        max="100000"
      />
      <input type="file" placeholder="Image URL" onChange={imageUpload} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="fish">Fish</option>
        <option value="poultry">Poultry</option>
      </select>
      <select value={offer} onChange={(e) => setOffer(e.target.value)} required>
        <option value="">Select Offer</option>
        <option value="10%">10% off</option>
        <option value="25%">25% off</option>
        <option value="30%">30% off</option>
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

export default AddProduct;
