import React from 'react'
import { Link } from 'react-router-dom'
import smartphone from "../assets/smartphone1.png"

export const ProductCard = ({image, category, name, price}) => {
  return (
    <div className='product--card'>
      <Link to="/product">
        <div className='product--image'>
            <img src={image} alt={category}/>
        </div>
        <div className='card--detail'>
            <h5>{category}</h5>
            <h4>{name}</h4>
            <p>₦{price}</p>
        </div> 
      </Link>
    </div>
  )
}
