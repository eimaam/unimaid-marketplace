import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { GoHome } from "react-icons/go"
import { FaRegUser } from "react-icons/fa"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { useData } from '../Context/DataContext'
import { useUser } from '../Context/UserContext'

export const Nav = () => {
  const { user, logOut } = useAuth()
  const { username } = useUser()
  return (
    <>
      <nav>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={username}>Profile</Link></li>
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

