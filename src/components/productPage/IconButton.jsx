import React from 'react'
import { FaPhone, FaVoicemail } from "react-icons/fa"
import { Link } from 'react-router-dom'

export const IconButton = ({icon, title, link}) => {
  return (
    <div className='info--button'>
        <a hef={link}>
          {icon}{title}
        </a>
    </div>
  )
}
