import React from 'react'
import { FaPhone, FaVoicemail } from "react-icons/fa"
import { Link } from 'react-router-dom'

export const IconButton = ({icon, title, link}) => {
  return (
    <div className='info--button'>
        <Link to={link}>
          {icon}{title}
        </Link>
    </div>
  )
}
