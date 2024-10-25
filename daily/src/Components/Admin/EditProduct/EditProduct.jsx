import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();  // Get product ID from URL params
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: 'fish',  // Default value set to 'fish'
        imageUrl: '',
        isDisabled: false  // Add isDisabled field
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the product by ID
        axios.get(`http://localhost:3001/api/product/view-products/${id}`)
            .then(response => {
                setProduct(response.data);  // Pre-fill the form with current product data
            })
            .catch(error => {
                console.error("There was an error fetching the product!", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make the PUT request to update the product
        axios.put(`http://localhost:3001/api/product/editProduct/${id}`, product)
            .then(response => {
                console.log("Product updated successfully", response);
                navigate('/dashboard');  // Redirect to product list after successful update
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });
    };

    const handleDisableProduct = () => {
        // Toggle the isDisabled field and update the product
        const updatedProduct = { ...product, isDisabled: !product.isDisabled };
    
        axios.put(`http://localhost:3001/api/product/disableProduct/${id}`, updatedProduct)
            .then(response => {
                console.log("Product visibility toggled successfully", response);
                navigate('/dashboard');  // Redirect to product list
            })
            .catch(error => {
                console.error("There was an error disabling the product!", error);
            });
    };

    return (
        <div className="edit-product">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={product.name} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        name="description" 
                        value={product.description} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={product.price} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select 
                        name="category"
                        value={product.category} 
                        onChange={handleInputChange} 
                    >
                        <option value="fish">Fish</option>
                        <option value="poultry">Poultry</option>
                    </select>
                </div>
                <div>
                    <label>Image URL:</label>
                    <input 
                        type="text" 
                        name="imageUrl" 
                        value={product.imageUrl} 
                        onChange={handleInputChange} 
                    />
                </div>
                
                <button type="submit">Save Changes</button>
            </form>

            {/* Disable Button */}
            <button 
                onClick={handleDisableProduct} 
                style={{ backgroundColor: product.isDisabled ? 'red' : 'green' }}
            >
                {product.isDisabled ? 'Enable Product' : 'Disable Product'}
            </button>
        </div>
    );
};

export default EditProduct;
