import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/AuthContext'
import { auth } from '../firebaseConfig'

export const ResetPass = () => {
  // getting error and setError already defined state from useAuth context
  const { message, setMessage } = useAuth()
  const [email, setEmail] = useState("")

  // function to send password reset mail
  const resetPassword = async (e) => {
    e.preventDefault()
    try{
      await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info('Reset Email Sent! Check your Mailbox or Spam Folder')
        setMessage('Reset Email Sent! Check your Mailbox or Spam Folder')
      })
    }
    catch(err){
      if(err.code === "auth/user-not-found"){
        toast.error('User not found')
      }else{
        toast.error(err.code)
      }
    }
  }

  return (
    <div className='container' id='resetPass'>
        <form onSubmit={resetPassword}>
              <input 
              type="email" 
              placeholder='Registered Email'
              onChange={(e) => setEmail(e.target.value)}
              required
              />
              <input 
              type="submit" 
              value="RESET"
              />
              <p>{message}</p>
        </form>
    </div>
  )
}
