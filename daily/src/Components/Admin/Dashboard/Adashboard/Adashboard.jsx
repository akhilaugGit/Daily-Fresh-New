import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Adashboard.css'; // Assuming you have a separate CSS file for styles

const ADashboard = () => {
  const navigate = useNavigate();

  // Card data with images and routes
  const cards = [
    {
      title: 'Product List',
      image: 'path/to/product-list-image.jpg', // Replace with actual image path
      route: '/dashboard',
    },
    {
      title: 'Add Product',
      image: 'path/to/add-product-image.jpg', // Replace with actual image path
      route: '/addproduct',
    },
    {
      title: 'Edit Product',
      image: 'path/to/edit-product-image.jpg', // Replace with actual image path
      route: '/editproduct',
    },
    {
      title: 'Manage User',
      image: 'path/to/manage-user-image.jpg', // Replace with actual image path
      route: '/manage',
    },
  ];

  return (
    <div className="dashboard-container">
      {cards.map((card, index) => (
        <div
          key={index}
          className="dashboard-card"
          onClick={() => navigate(card.route)}
        >
          <img src={card.image} alt={card.title} className="dashboard-card-image" />
          <h3>{card.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ADashboard;
