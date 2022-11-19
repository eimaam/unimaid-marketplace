import React from 'react'
import { Link } from 'react-router-dom'
import smartphone from "../assets/smartphone1.png"

export const ProductCard = () => {
  const random = Math.floor(Math.random() * (10-1) - 1) + 1
  return (
    <div className='product--card'>
      <Link to="/product">
        <div className='product--image'>
            <img src={smartphone} alt="" />
        </div>
        <div className='card--detail'>
            <h5>Smartphones</h5>
            <h3>Motorola Z3</h3>
            <p>N{56000*random}</p>
        </div> 
      </Link>
    </div>
  )
}
