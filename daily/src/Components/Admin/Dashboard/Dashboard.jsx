// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import ProductCard from './ProductCard/ProductCard';
import Footer from './Footer/Footer';
import axios from 'axios';
import { jsPDF } from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';  // Import autoTable plugin for table support in jsPDF
import './ProductTable/ProductTable.css';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/view-product`);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Error fetching the products!", error);
            }
        };
        fetchProducts();
    }, []);

    const filterProducts = (category) => {
        let updatedProducts = products;

        if (category !== 'all') {
            updatedProducts = updatedProducts.filter((product) => product.category === category);
        }

        if (searchQuery) {
            updatedProducts = updatedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
        setSelectedCategory(category);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        filterProducts(selectedCategory);
    };

    // Function to generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Product Report', 14, 10);

        // Using autoTable to format table in PDF
        doc.autoTable({
            head: [['Product Name', 'Category', 'Stock']],
            body: filteredProducts.map((product) => [
                product.name,
                product.category,
                product.stock
            ]),
        });

        doc.save('Product_Report.pdf');
    };

    return (
        <div>
            <Navbar />

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="🔎 Search by name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="fbuttons">
                <button 
                    className={`fbtn ${selectedCategory === 'fish' ? 'active' : ''}`} 
                    onClick={() => filterProducts('fish')}
                >
                    Fish
                </button>
                <button 
                    className={`fbtn ${selectedCategory === 'poultry' ? 'active' : ''}`} 
                    onClick={() => filterProducts('poultry')}
                >
                    Poultry
                </button>
                <button 
                    className={`fbtn ${selectedCategory === 'all' ? 'active' : ''}`} 
                    onClick={() => filterProducts('all')}
                >
                    Show All
                </button>
            </div>

            <div className="product-table-container">
                <h2>Product List</h2>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                name={product.name}
                                category={product.category}
                                stock={product.stock}
                            />
                        ))}
                    </tbody>
                </table>

                {/* Button to Generate PDF Report */}
                <button onClick={generatePDF} className="btn btn-primary">
                    Generate PDF Report
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
