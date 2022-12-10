import React from 'react'

export const IconButton = ({icon, title, link}) => {
  return (
    <div className='info--button'>
        <a href={link}>
          {icon}{title}
        </a>
    </div>
  )
}
