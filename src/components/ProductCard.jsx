import React from 'react'
import { Link } from 'react-router-dom'

export const ProductCard = ({image, category, name, price, id}) => {

  // decode the encoded id to a browser url recognized format
  const url = decodeURI(id)

  return (
    <div className='product--card' data-aos="fade-up">
      <Link to={`/product/${url}`}>
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
