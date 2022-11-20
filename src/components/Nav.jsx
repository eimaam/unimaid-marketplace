import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export const Nav = () => {
  const { user, logOut } = useAuth()
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li onClick={logOut} className="btn--small error--background">Sign Out</li>
            <li><Link to="/createads">Post Ad</Link></li>
        </ul>
    </nav>
  )
}
