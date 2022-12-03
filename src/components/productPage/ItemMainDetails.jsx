import React from 'react'
import { useAuth } from '../../Context/AuthContext'

export const ItemMainDetails = ({itemName, price, handleClick, posterEmail}) => {
    const { user } = useAuth()
  return (
    <>
    <div className='product--info'>
          <h2>{itemName}</h2>
          <h2>{`₦ ${price}`}</h2>
        </div>
        {/* close Ad button */}
        {/* only show if the email of the ad creator matches the logged in user to enable only the ad creator close ad */}
        {user != null && posterEmail === user.email &&
        <div>
          <button className='error--background' onClick={() => handleClick(prev => !prev)}>Close Ad</button>
        </div>
        }
    </>
  )
}
