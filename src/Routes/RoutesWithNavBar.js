import React from 'react'
import { Outlet } from 'react-router-dom'

export const RoutesWithNavBar = () => {
  return (
    <>
        <Nav />
        <Outlet />
    </>
  )
}
