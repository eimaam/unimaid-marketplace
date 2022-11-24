import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'

export const RoutesWithNavBar = () => {
  return (
    <>
        <Nav />
        <Outlet />
        <Footer />
    </>
  )
}
