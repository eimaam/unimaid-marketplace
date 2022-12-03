import React, { useEffect, useState } from 'react';
import {Routes, Route} from "react-router-dom"
import { Settings } from './components/AccountSettings/Settings';
import { Homepage } from './components/LandingPage/Homepage';
import { Login } from './components/Login';
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
import { RoutesWithNavBar } from './Routes/RoutesWithNavBar';
import { DataProvider } from './Context/DataContext';
import { LoaderFullscreen } from './components/LoaderFullscreen';
import { CreateAd } from './components/CreateAd';


function App() {
  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500);
  })

  if(loading){
    return <LoaderFullscreen />
  }

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <DataProvider>
          <Routes>
            <Route element={<ProtectedRoutes />} >
              <Route path='/complete-profile' element={<AddData />} />
              <Route path='settings' element={<Settings />} />
              <Route path='/createad' element={<CreateAd />} />
            </Route>
            {/* routes with nav and footer */}
            <Route element={<RoutesWithNavBar />}>
              <Route path='/' element={<Homepage />} />
              <Route path=':usernameParam' element={<SellerProfile />} />
              <Route path='product/:url' element={<ProductPage />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/reset' element={<ResetPass />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          </DataProvider>
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
