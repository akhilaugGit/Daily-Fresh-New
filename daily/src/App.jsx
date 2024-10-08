import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Home from './Home/Home';
import ResetPassword from './ResetPassword/ResetPassword';
import AddProduct from './Components/Admin/AddProduct/AddProduct'; // Import AddProduct component
import ProductList from './Components/Admin/Dashboard/ProductList/ProductList'; // Import ProductList component
import EditProduct from './Components/Admin/EditProduct/EditProduct'; // Import EditProduct component


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-product' element={<AddProduct />} /> {/* Route for adding products */}
        <Route path='/edit-product/:id' element={<EditProduct />} /> {/* Route for editing products */}
        <Route path='/products' element={<ProductList />} /> {/* Route for viewing all products */}
        <Route path='/resetpassword/:userId/:token' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
