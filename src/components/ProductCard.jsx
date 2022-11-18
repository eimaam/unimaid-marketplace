import React from 'react'
import smartphone from "../assets/smartphone1.png"

export const ProductCard = () => {
  return (
    <div className='product--card'>
        <div className='product--image'>
            <img src={smartphone} alt="" />
        </div>
        <div className='product--detail'>
            <h5>Smartphones</h5>
            <h3>Motorola Z3</h3>
            <p>N14,000</p>
        </div> 
    </div>
  )
}
