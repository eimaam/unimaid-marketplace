import React from 'react'
import { Outlet } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { LoaderFullsceen, LoaderFullscreen } from '../components/LoaderFullscreen'
import { useAuth } from '../Context/AuthContext'
import { useUser } from '../Context/UserContext'

export const ProtectedRoutes = () => {
    const { user, navigate, loading } = useAuth()

  if(loading){
      return <LoaderFullscreen />
  }

  return (
    user ? <Outlet /> : navigate('login')

  )
  
}
