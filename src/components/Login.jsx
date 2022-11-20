import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ResetPass } from './ResetPass'
import { toast } from "react-toastify"
import { useAuth } from '../Context/AuthContext'
import { auth } from '../firebaseConfig'



export const Login = () => {
    const { user, loading, setLoading, navigate, setIsLogged, error, setError } = useAuth()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    // handle change
    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    const [showModal, setShowModal] = useState(false)
    // login function
    const login = async (e) => {
        e.preventDefault()
        try{
            await setPersistence(auth, browserLocalPersistence)
            await signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                setIsLogged(true)
                toast.success('Logged in...')
                navigate('/profile')
            })
            setLoading(false)
        }
        catch(err){
            if(err.code === 'auth/wrong-password'){
                toast.error('Wrong Password')
                setError('Wrong Password')
              }else if(err.code === 'auth/too-many-requests'){
                toast.error('Too many trials! You will have to reset your password to access this site!')
                setError('Too many trials! You will have to reset your password to access this site!')
              }else if(err.code === 'auth/user-not-found'){
                toast.error('User not found!')
                setError('User not found!')
            }else if(err.code === 'auth/network-request-failed'){
                setError('Sorry...! Something went wrong. Check your internet connection')
            }else if(err.code === 'auth/invalid-email'){
                toast.error('Email or Password incorrect')
                setError('Email or Password incorrect')
              }
              else{
                console.log(err.message)
                toast.error('Retry...')
            }
        }
        
    }
    
  return (
    <div className='container' id='login'>
        <form onSubmit={login}>
            <h2>Hi there! 👋 Welcome!</h2>
            <h3>Enter your login details:</h3>
            <div>
                <input 
                type="email" 
                name="email"
                value={data.email}
                placeholder='Email Address'
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <input 
                type="password" 
                name="password"
                value={data.password}
                placeholder='Password'
                onChange={handleChange}
                required
                />
            </div>
            {/* error message */}
            <i className="error">{error}</i>
            <div>
                <input type='submit' value="Log in"/>
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
