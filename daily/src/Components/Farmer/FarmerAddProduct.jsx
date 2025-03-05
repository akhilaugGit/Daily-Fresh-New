import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FarmerAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImage] = useState("");
  const [category, setCategory] = useState("fish");
  const [subcategory, setSubcategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const navigate = useNavigate();

  const validateText = (text) => /^[A-Za-z\s]+$/.test(text);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  };

  const errorInputStyle = {
    ...inputStyle,
    border: "1px solid #ff4444",
    backgroundColor: "#fff8f8",
  };

  const errorTextStyle = {
    color: "#ff4444",
    fontSize: "14px",
    margin: "4px 0 8px 0",
    fontStyle: "italic",
    transition: "opacity 0.3s ease",
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (value && !validateText(value)) {
      setNameError("Product name can only contain letters and spaces");
    } else {
      setNameError("");
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    
    if (value && !validateText(value)) {
      setDescriptionError("Description can only contain letters and spaces");
    } else {
      setDescriptionError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!validateText(name) || !validateText(description)) {
      setErrorMessage("Please fix the validation errors before submitting.");
      return;
    }

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
      formData.append("isDisabled", true);

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
    navigate("/fuser");
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      backgroundColor: "#fff"
    }}>
      <span onClick={handleHomeClick} style={{
        cursor: "pointer",
        display: "block",
        marginBottom: "20px",
        color: "#666",
        fontSize: "16px"
      }}>
        🏡 Farmer Dashboard
      </span>
      
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={handleNameChange}
        required
        style={nameError ? errorInputStyle : inputStyle}
      />
      {nameError && <p style={errorTextStyle}>{nameError}</p>}

      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        required
        style={descriptionError ? {
          ...errorInputStyle,
          minHeight: "100px",
          resize: "vertical"
        } : {
          ...inputStyle,
          minHeight: "100px",
          resize: "vertical"
        }}
      />
      {descriptionError && <p style={errorTextStyle}>{descriptionError}</p>}

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="1"
        max="100000"
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        min="50"
        max="1000"
        style={inputStyle}
      />

      <input
        type="file"
        onChange={imageUpload}
        required
        style={{
          ...inputStyle,
          padding: "8px",
          backgroundColor: "#f9f9f9"
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        style={inputStyle}
      >
        <option value="poultry">Poultry</option>
      </select>
      
      <input
        type="text"
        placeholder={`Enter ${category} type`}
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        required
        style={inputStyle}
      />

      {errorMessage && <p style={{
        ...errorTextStyle,
        backgroundColor: "#ffe6e6",
        padding: "10px",
        borderRadius: "4px",
        marginTop: "10px"
      }}>{errorMessage}</p>}

      <button type="submit" style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#01644c",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "20px",
        transition: "background-color 0.3s ease",
      }}>Add Product</button>
    </form>
  );
}

export default FarmerAddProduct;