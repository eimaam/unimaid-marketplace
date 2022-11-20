import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CgGoogle } from "react-icons/cg"
import { useAuth } from '../Context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from "react-toastify"
import { auth } from '../firebaseConfig'

export const SignUp = () => {
    const { loading, setLoading, user, setUser, isLogged, setIsLogged, navigate, logInWithGoogle, userRef, setError, error } = useAuth()

    const [data, setData] = useState({
        email: "",
        password: "",
        displayName: "",
        phoneNo: "",
        staysHostel: "",
        location: "",
    })

    const {email, password, displayName, phoneNo, staysHostel, location} = data

    // handle input change
    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setData(prevData => ({
            ...prevData,
            [name]:value
        }))
        console.log(data)
    }

    // handle signup
    const signUp = async (e) => {
        e.preventDefault()
        if(password.length < 6){
            setLoading(false)
            return toast.error('Password must be at least 6 Chars')
        }
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setUser({
                    email: email,
                    displayName: displayName,
                })
                setDoc(doc(userRef, {
                    email: email,
                    displayName: displayName,
                    location: location,
                    phoneNo: phoneNo,
                    staysHostel: staysHostel,
                    isVerified: false,
                }))
                setLoading(false)
                toast.success('Signed up successfully...')
                return navigate('/profile')
            })
        }
        catch(err){
            if(err.code === 'auth/wrong-password'){
                toast.error('Wrong Password')
                setError('Wrong Password')
              }else if(err.code === 'auth/too-many-requests'){
                toast.error('Too many trials! You will have to reset your password to access this site!')
                setError('Too many trials! You will have to reset your password to access this site!')
              }else if(err.code === 'auth/user-not-found'){
              }else if(err.code === 'auth/email-already-in-use'){
                toast.error('Email already in use!')
                setError('Email already in use')
              }else if(err.code === 'auth/user-not-found'){
                toast.error('User not found!')
                setError('User not found!')
              }else if(err.code === 'auth/network-request-failed'){
                setError('Sorry...! Something went wrong. Check your internet connection')
              }
              else{
                setLoading(false)
                console.log(err.message)
              }
        }
    }

  return (
    <div className='container' id='signup'>
        <form onSubmit={signUp}>
            <h3>Hi there! Welcome!</h3>
            <h4>Enter your details to register your business/brand:</h4>
            <div>
                <input 
                type="email"
                name='email' 
                placeholder='Email Address'
                value={email}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <input 
                type="number" 
                name='phoneNo'
                placeholder='Phone Number - preferrably WA number'
                pattern='08012345678 - without country code'
                value={phoneNo}
                onChange={handleChange}
                />
            </div>
            <div>
                <input 
                type="text"
                name='displayName' 
                placeholder='Full Name/Business Name'
                value={displayName}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <select name='staysHostel' defaultValue="Do you stay in Hostel?" onChange={handleChange}>
                    <option defaultValue="" disabled>Do you stay in Hostel?</option>
                    <option value="yes">YES</option>
                    <option value="no">NO</option>
                </select>
            </div>
            <i>If your answer to the above question is YES, enter your Hostel name 
                else enter the name of your area of residence here in Maiduguri.
            </i>
            <div>
                <input 
                type="text" 
                name='location'
                value={location}
                placeholder='Area/Hostel Name'
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <input 
                type="password" 
                placeholder='Password'
                name='password'
                value={password}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <input type='submit' value="Sign up" />
            </div>
            <div>
                <p>{error}</p>
            </div>
            <p>or</p>
            <div>
                <button className='flex-row' style={{margin: "auto"}} onClick={logInWithGoogle}>
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
