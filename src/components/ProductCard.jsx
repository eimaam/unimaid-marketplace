import React from 'react'
import { Link } from 'react-router-dom'
import smartphone from "../assets/smartphone1.png"

export const ProductCard = ({image, category, name, price}) => {
  const random = Math.floor(Math.random() * (10-1) - 1) + 1
  let test = "32,000"
  const test1 = test.replace(",", "") 
  console.log(parseInt(test1))
  return (
    <div className='product--card'>
      <Link to="/product">
        <div className='product--image'>
            <img src={image} alt={category}/>
        </div>
        <div className='card--detail'>
            <h5>{category}</h5>
            <h4>{name}</h4>
            <p>N{price}</p>
        </div> 
      </Link>
    </div>
  )
}
