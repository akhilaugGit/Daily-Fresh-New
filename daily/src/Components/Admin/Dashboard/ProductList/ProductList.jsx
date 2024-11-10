import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import './ProductList.css';  // Ensure to import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/view-product`)  
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/delete/${id}`)
    .then(response => {
        setProducts(products.filter(product => product._id !== id));
        console.log("Product deleted successfully");
    })
    .catch(error => {
        console.error("There was an error deleting the product!", error);
    });
        }
    };
    const handledashboard = () => {
        navigate('/dashboard');  // Pass totalPrice to Buy component
      };
    return (
        <div className="product-list">
            <h2>Products</h2>
            <button onClick={handledashboard}>
    ⬅️Back
      </button>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <ProductCard
                            imageUrl={product.imageUrl}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            category={product.category}  // Display category
                        />
                        <div className="product-actions">
                        

                            <Link to={`/edit-product/${product._id}`}>
                                <button className="edit-button">Edit</button>
                            </Link>
                            {/* <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
