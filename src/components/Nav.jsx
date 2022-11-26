import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { GoHome } from "react-icons/go"
import { FaRegUser } from "react-icons/fa"
import { AiOutlinePlusCircle } from "react-icons/ai"

export const Nav = () => {
  const { user, logOut } = useAuth()
  return (
    <>
      <nav>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile/:sellerName">Profile</Link></li>
              {user && <li onClick={logOut} className="btn--small error--background">Sign Out</li>}
              <li><Link to="/createad">Post Ad</Link></li>
          </ul>
      </nav>
      <div id='mNav'>
        <ul>
          <li><Link to=""><GoHome /></Link></li>
          <li><Link to=""><FaRegUser /></Link></li>
          <li><Link to=""><AiOutlinePlusCircle /></Link></li>
        </ul>
      </div>
  </>
  )
}

