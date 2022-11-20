import React from 'react'
import { Link } from 'react-router-dom'
import { CgGoogle } from "react-icons/cg"

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
                pattern='+2348012345678'
                />
            </div>
            <div>
                <input 
                type="text" 
                placeholder='Full Name/Business Name'
                />
            </div>
            <div>
                <select name="" id="" value="Do you stay in Hostel?">
                    <option defaultValue="" value="Do you stay in Hostel?" disabled>Do you stay in Hostel?</option>
                    <option value="yes" disabled>YES</option>
                    <option value="no" disabled>NO</option>
                </select>
            </div>
            <p>If your answer to the above question is YES, enter your Hostel name 
                else enter the name of your area of residence here in Maiduguri.
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
                <input type='submit' value="Sign up"/>
            </div>
            <p>or</p>
            <div>
                <button className='flex-row' style={{margin: "auto"}}>
                    <CgGoogle /> Sign up with Google 
                </button>
            </div>
            <div>
                <p>Have an account already? <button className='btn--small'><Link to="/login">Login</Link></button></p>
            </div>
        </form>
    </div>
  )
}
