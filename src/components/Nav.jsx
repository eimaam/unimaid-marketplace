import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">How-To</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">Post Ads</Link></li>
        </ul>
    </nav>
  )
}
