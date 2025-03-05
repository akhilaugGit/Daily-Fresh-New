import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Home from './Home/Home';
import ResetPassword from './ResetPassword/ResetPassword';
import AddProduct from './Components/Admin/AddProduct/AddProduct'; 
import ProductList from './Components/Admin/Dashboard/ProductList/ProductList'; 
import EditProduct from './Components/Admin/EditProduct/EditProduct'; 
import Udashboard from './Components/User/Udashboard/Udashboard';
import Cart from './Components/User/Cart';
import Buy from './Components/User/Udashboard/Buy';
import UproductCard from './Components/User/Udashboard/UproductCard/UproductCard';
import Manage from './Components/Admin/Manage/Manage';
import ProductTable from './Components/Admin/Dashboard/ProductTable/ProductTable';
import Uprofile from './Components/User/Udashboard/Uprofile/Uprofile';
import About from './Components/about/about';
import ADashboard from './Components/Admin/Dashboard/Adashboard/Adashboard';
import Duser from './Components/Duser/Duser';
import DeliveryRegister from './Components/Duser/DeliveryRegister';
import ManageDusers from './Components/Admin/ManageDusers';
import Dnavbar from './Components/Duser/Dnavbar';
import Duprofile from './Components/Duser/Duprofile';
import TasteProfile from './Components/User/TasteProfile';
import Fuser from './Components/Fuser';
import Game from './Components/Game/Game';
import FarmerAddProduct from './Components/Farmer/FarmerAddProduct';
import OrderDetails from './Components/User/Udashboard/OrderDetails';
import ViewOrder from './Components/User/Udashboard/Vieworder';
import ChatBot from './Components/Chat/ChatBot';

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);  // Loading state
  const token = localStorage.getItem('token');   // Fetch token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate token validation (if needed)
    if (!token) {
      navigate('/login');  // Redirect to login if no token
    } else {
      setLoading(false);    // Token exists, stop loading
    }
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>;  // Display a loading message while checking token
  }

  return token ? children : null;   // Render children if token exists, otherwise render null
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/add-product' element={<AddProduct />} /> {/* Route for adding products */}
        <Route path='/edit-product/:id' element={<EditProduct />} /> {/* Route for editing products */}
        <Route path='/products' element={<ProductList />} /> {/* Route for viewing all products */}
        <Route path='/resetpassword/:userId/:token' element={<ResetPassword />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/manage' element={<Manage />} />
        <Route path='/uproductcard' element={<UproductCard />} />
        <Route path='/about' element={<About />} /> 
        <Route path='/producttable' element={<ProductTable />} />
        <Route path='/uprofile' element={<Uprofile />} />
        <Route path='/duser'element={<Duser />} />
        <Route path='/adashboard' element={<ADashboard />} />
        <Route path='/deliveryregister'element={<DeliveryRegister/>} />
        <Route path='/managedusers' element={<ManageDusers />} />
        <Route path='/dnavbar' element={<Dnavbar />} />
        <Route path='/duprofile' element={<Duprofile />} />
        <Route path='/taste' element={<TasteProfile />} />
        <Route path='/fuser' element={<Fuser />} />
        <Route path='/game' element={<Game />} />
        <Route path='/farmeraddproduct' element={<FarmerAddProduct />} />
        <Route path='/orderdetails' element={<OrderDetails />} />
        <Route path='/vieworder' element={<ViewOrder />} />

        <Route path='/chatbot' element={<ChatBot />} />




        







        {/* Protect the udashboard route with PrivateRoute */}
        <Route path='/udashboard' element={
          <PrivateRoute>
            <Udashboard />
          </PrivateRoute>
        } />
        
        {/* Protect the dashboard route with PrivateRoute */}
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
