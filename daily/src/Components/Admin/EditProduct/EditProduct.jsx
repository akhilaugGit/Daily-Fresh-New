import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProduct = ({ match }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('fish'); // Default category

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:3001/api/product/${match.params.id}`);
            const product = response.data;
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category); // Set the category from fetched product
        };
        fetchProduct();
    }, [match.params.id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/product/${match.params.id}`, {
                name,
                description,
                price,
                image,
                category // Include category in request
            });
            alert("Product updated successfully");
        } catch (error) {
            console.error("There was an error updating the product!", error);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="fish">Fish</option>
                <option value="poultry">Poultry</option>
            </select>
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;
