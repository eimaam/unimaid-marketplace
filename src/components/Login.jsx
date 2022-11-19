import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ResetPass } from './ResetPass'

export const Login = () => {
    const [showModal, setShowModal] = useState(false)
    
  return (
    <div className='container' id='login'>
        <form >
            <h2>Hi there! Welcome!</h2>
            <h3>Enter your login details:</h3>
            <div>
                <input 
                type="email" 
                placeholder='Email Address'
                />
            </div>
            <div>
                <input 
                type="password" 
                placeholder='Password'
                />
            </div>
            <div>
                <input type='submit' />
            </div>
            <div>
                <p>Forgot Password? <button className="btn--small error--background"><Link to="/reset">RESET</Link></button></p>
                <p>or</p>
                <p>Don't have an account yet? <button className='btn--small'><Link to="/signup"> SIGN UP </Link></button></p>
            </div>
        </form>
    </div>
  )
}
