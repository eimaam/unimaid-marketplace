import React from 'react'
import { FaPhone, FaVoicemail } from "react-icons/fa"

export const InfoButton = ({icon, title}) => {
  return (
    <div className='info--button'>
        {icon}
        <h4>{title}</h4>
    </div>
  )
}
