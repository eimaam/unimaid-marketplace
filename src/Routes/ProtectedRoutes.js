import React from 'react'
import { Outlet } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { LoaderFullsceen } from '../components/LoaderFullscreen'
import { useAuth } from '../Context/AuthContext'
import { useUser } from '../Context/UserContext'

export const ProtectedRoutes = () => {
    const { user, navigate, loading } = useAuth()
    const { userInfo } = useUser()

  if(userInfo.length === 0){
      return <LoaderFullsceen />
  }

  return (
    user ? <Outlet /> : navigate('login')

  )
  
}
