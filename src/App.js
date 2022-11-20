import React from 'react';
import {Routes, Route} from "react-router-dom"
import { AccountSettings, Settings } from './components/AccountSettings/Settings';
import { Footer } from './components/Footer';
import { Homepage } from './components/LandingPage/Homepage';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import { PostAds } from './components/PostAds';
import { ProductPage } from './components/productPage/ProductPage';
import { ResetPass } from './components/ResetPass';
import { SellerProfile } from './components/SellerProfile';
import { SignUp } from './components/SignUp';
// toastify
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Context/AuthContext';
import { AddData } from './components/AddData';


function App() {
  return (
    <>
      <AuthProvider>
        {/* <Nav /> */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/complete-profile' element={<AddData />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset' element={<ResetPass />} />
        <Route path='/createAds' element={<PostAds />} />
        <Route path='/profile' element={<SellerProfile />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      </AuthProvider>
      <Footer />
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
