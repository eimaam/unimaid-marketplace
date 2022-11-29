import React from 'react'
import { GoHome } from "react-icons/go"
import { FaRegUser } from "react-icons/fa"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { useUser } from '../Context/UserContext'


export const MobileNav = () => {
    const { username } = useUser()
  return (
    <div id='mNav'>
        <ul>
          <li><Link to="/"><GoHome /></Link></li>
          <li><Link to={username}><FaRegUser /></Link></li>
          <li><Link to="/createad"><AiOutlinePlusCircle /></Link></li>
        </ul>
      </div>
  )
}
