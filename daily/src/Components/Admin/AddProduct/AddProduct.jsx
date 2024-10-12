import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImage] = useState('');
    const [category, setCategory] = useState('fish'); // Default category
    const [subcategory, setSubcategory] = useState(''); // Subcategory field
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous error message
        setErrorMessage('');

        // Validate price
        if (price <= 0) {
            setErrorMessage('Price must be greater than 0.');
            return;
        }
        if (price > 100000) {
            setErrorMessage('Price cannot exceed 100,000.');
            return;
        }

        // Proceed if validations pass
        try {
            const data = {
                name,
                description,
                price,
                imageUrl,
                category,
                subcategory
            };

            console.log(data);  // For debugging

            const response = await axios.post('http://localhost:3001/api/product/add', data);
            alert(response.data.message);

            // Reset form fields
            setName('');
            setDescription('');
            setPrice('');
            setImage('');
            setCategory('fish');
            setSubcategory('');

        } catch (error) {
            console.error("There was an error adding the product!", error);
            setErrorMessage('There was an error adding the product. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
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
                type="text" 
                placeholder="Image URL" 
                value={imageUrl} 
                onChange={(e) => setImage(e.target.value)} 
                required 
            />

            {/* Category Dropdown */}
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="fish">Fish</option>
                <option value="poultry">Poultry</option>
            </select>

            {/* Subcategory field */}
            <input 
                type="text" 
                placeholder={`Enter ${category} type`} 
                value={subcategory} 
                onChange={(e) => setSubcategory(e.target.value)} 
                required 
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Display error message */}

            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
