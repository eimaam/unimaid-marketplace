import React from 'react'


export const CategoryCard = ({image, title}) => {
  return (
    <div className='category--card'>
        <img src={image} alt="" />
        <h3>{title}</h3>
    </div>
  )
}
