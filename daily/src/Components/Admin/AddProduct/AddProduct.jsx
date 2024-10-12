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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name:name,
                description:description,
                price:price,
                imageUrl:imageUrl,
                category:category,
                subcategory:setCategory
            }
            console.log(data);
            const response = await axios.post('http://localhost:3001/api/product/add', {
                name,
                description,
                price,
                imageUrl,
                category,  // Include category in request
                subcategory // Include subcategory in request
            });
            alert(response.data.message);
        } catch (error) {
            console.error("There was an error adding the product!", error);
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

            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
