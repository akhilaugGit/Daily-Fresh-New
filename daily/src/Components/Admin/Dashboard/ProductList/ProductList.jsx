import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Ensure to import the CSS file

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:3001/api/products/${id}`)
                .then(response => {
                    setProducts(products.filter(product => product._id !== id)); // Remove deleted product from UI
                })
                .catch(error => {
                    console.error("There was an error deleting the product!", error);
                });
        }
    };

    return (
        <div className="product-list">
            <h2>Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <ProductCard
                            image={product.image}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            category={product.category} // Display category
                        />
                        <div className="product-actions">
                            <Link to={`/edit-product/${product._id}`}>
                                <button className="edit-button">Edit</button>
                            </Link>
                            <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
