import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const ProtectedRoutes = () => {
    const navigate = useNavigate()
  return (
    user ? <Outlet /> : navigate('/login')
  )
}
