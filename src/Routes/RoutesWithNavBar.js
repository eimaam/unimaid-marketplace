import React from 'react'
import { Outlet } from 'react-router-dom'
import { DesktopNav } from '../components/DesktopNav'
import { Footer } from '../components/Footer'

export const RoutesWithNavBar = () => {
  return (
    <>
        <DesktopNav />
        <Outlet />
        <Footer />
    </>
  )
}
