// ProductTable.jsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductTable.css';

const ProductTable = ({ products }) => {
    return (
        <div className="product-table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            productId={product.productId}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            category={product.category}
                            stock={product.stock}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
