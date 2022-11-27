import { deleteUser } from 'firebase/auth'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { auth } from '../../firebaseConfig'
import { useAuth } from '../../Context/AuthContext'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AccountSettings = ({option, setOption}) => {
    const { user, loading, setLoading, navigate, userRef } = useAuth()

    const deleteAccount = async () => {
        try{
            const confirmPass = prompt("Enter \"delete my account\" to DELETE Account")
            if(confirmPass !== "delete my account"){
                return toast.error('Incorrect entry')
            }
            // update the account status in database to inactive then execute deleting
            await updateDoc(doc(userRef, user.email), {
                accountStatus: "inactive"
            })
            await deleteUser(auth.currentUser)
            .then(() => {
                toast.success('Account deleted successfully')
                setLoading(true)
                return navigate('login')
            })
        }
        catch(err){
            console.log(err.message)
        }
    }



  return (
    <aside>
        <h2>Account Settings:</h2>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h3>Password</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("password")}>Change</button>
            </div>
            {option === "password" &&
                <form action="">
                    <input 
                    type="password" 
                    placeholder='Enter New Password'
                    />
                    <button type='submit'>Submit</button>
                </form>
            }
        </div>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h3>Delete Account</h3>
                </div>
                <button className='btn--small error--background' onClick={() => deleteAccount()}>Delete Account</button>
            </div>
            {option === "delete" &&
                <form action="">
                    <input 
                    type="email" 
                    placeholder='Enter New Email'
                    />
                    <button type='submit'>Submit</button>
                </form>
            }
        </div>
    </aside>
  )
}
