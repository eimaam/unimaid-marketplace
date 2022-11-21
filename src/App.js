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
import { UserProvider } from './Context/UserContext';
import { ProtectedRoutes } from './Routes/ProtectedRoutes';
import { ErrorPage } from "./components/ErrorPage"


function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
        {/* <Nav /> */}
      <Routes>
        <Route element={<ProtectedRoutes />} >
          <Route path='/complete-profile' element={<AddData />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/createAds' element={<PostAds />} />
        </Route>
        <Route path='/profile' element={<SellerProfile />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset' element={<ResetPass />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
        </UserProvider>
      </AuthProvider>
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
