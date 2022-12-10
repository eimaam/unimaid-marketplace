import React from 'react'


export const CategoryCard = ({image, title}) => {
  return (
    <div className='category--card'>
        <img src={image} alt="" data-aos="zoom-in-up"/>
        <h4>{title}</h4>
    </div>
  )
}
