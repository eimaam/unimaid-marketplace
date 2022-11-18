import React from 'react';
import {Routes, Route} from "react-router-dom"
import { Footer } from './components/Footer';
import { Homepage } from './components/LandingPage/Homepage';
import { Nav } from './components/Nav';
import { ProductPage } from './components/productPage/ProductPage';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product' element={<ProductPage />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
