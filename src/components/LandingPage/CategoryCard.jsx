import React from 'react'


export const CategoryCard = ({image, title}) => {
  return (
    <div className='category--card'>
        <img src={image} alt="" />
        <h4>{title}</h4>
    </div>
  )
}
