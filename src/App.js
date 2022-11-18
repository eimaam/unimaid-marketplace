import React from 'react';
import {Routes, Route} from "react-router-dom"
import { Footer } from './components/Footer';
import { Homepage } from './components/LandingPage/Homepage';
import { Nav } from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
