import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export const ProtectedRoutes = () => {
    const { user, navigate } = useAuth()
  return (
    user ? <Outlet /> : navigate('login')
  )
}
