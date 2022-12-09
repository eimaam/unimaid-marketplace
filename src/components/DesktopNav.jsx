import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { GoHome } from "react-icons/go"
import { FaRegUser } from "react-icons/fa"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { useData } from '../Context/DataContext'
import { useUser } from '../Context/UserContext'
import { MobileNav } from './MobileNav'

export const DesktopNav = () => {
  const { user, logOut } = useAuth()
  const { username } = useUser()
  return (
    <>
      <nav>
          <ul>
              <li><Link to="/">Home</Link></li>
              {user ? <li><Link to={`${username}`}>Profile</Link></li> 
              : <li><Link to="login">Login</Link></li>
              }
              {user && <li onClick={logOut} className="btn--small error--background" style={{borderRadius: "0.5rem"}}>Sign Out</li>}
              <li><Link to="/createad">Post Ad</Link></li>
          </ul>
      </nav>
      {/* Mobile Nav Bar */}
      <MobileNav />
  </>
  )
}

