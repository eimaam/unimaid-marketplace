import React from 'react'
import { Link } from 'react-router-dom'

export const SignUp = () => {
  return (
    <div className='container' id='signup'>
        <form>
            <h2>Hi there! Welcome!</h2>
            <h2>Enter your details to sign up:</h2>
            <div>
                <input 
                type="email" 
                placeholder='Email Address'
                />
            </div>
            <div>
                <input 
                type="tel" 
                placeholder='Phone Number - preferrably WA number'
                />
            </div>
            <div>
                <input 
                type="text" 
                placeholder='Full Name/Business Name'
                />
            </div>
            <div>
                <select name="" id="" value={"Do you stay in Hostel?"}>
                    <option defaultValue={"Do you stay in Hostel?"} value="" disabled>Do you stay in Hostel?</option>
                    <option value="yes" disabled>YES</option>
                    <option value="no" disabled>NO</option>
                </select>
            </div>
            <p>If your answer to the above question is YES, enter your Hostel name 
                <br /> else enter the name of your area of residence here in Maiduguri.
            </p>
            <div>
                <input 
                type="text" 
                placeholder='Area/Hostel Name'
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
                <p>Have an account already? <button className='btn--small'><Link to="/login">Login</Link></button></p>
            </div>
        </form>
    </div>
  )
}
