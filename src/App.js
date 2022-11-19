import React from 'react';
import {Routes, Route} from "react-router-dom"
import { Footer } from './components/Footer';
import { Homepage } from './components/LandingPage/Homepage';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import { PostAds } from './components/PostAds';
import { ProductPage } from './components/productPage/ProductPage';
import { ResetPass } from './components/ResetPass';
import { SellerProfile } from './components/SellerProfile';
import { SignUp } from './components/SignUp';

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset' element={<ResetPass />} />
        <Route path='/createAds' element={<PostAds />} />
        <Route path='/profile' element={<SellerProfile />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
