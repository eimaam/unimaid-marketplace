import React, { useState } from 'react'
import { useUser } from '../../Context/UserContext'
import { deleteUser } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { auth } from '../../firebaseConfig'
import { toast } from 'react-toastify'
import { useAuth } from '../../Context/AuthContext'

export const ProfileSettings = ({option, setOption, name}) => {
    const { user, loading, setLoading, userRef } = useAuth()

    const [displayName, setDisplayName] = useState("")

    const updateDisplayName = async () => {
        try{
            setLoading(true)
            await updateDoc(doc(userRef, user.email), {
                displayName: displayName
            })
            toast.success('Display Name updated')
            setLoading(false)
        }
        catch(err){
            console.log(err.message)
        }
    }
    
  return (
    <aside>
        <h2>Profile Settings:</h2>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Display Name:</h4>
                    <h3>{name}</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("display name")}>Change</button>
            </div>
            {
                // display if "option" state above === displayName
            option === "display name" 
            &&
                <>
                    <input 
                    type="text" 
                    placeholder='Enter New Name'
                    onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <button onClick={updateDisplayName}>Submit</button>
                </>
            }
        </div>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Change Display Photo:</h4>
                </div>
                <button className='btn--small' onClick={() => setOption("displayPhoto")}>Change</button>
            </div>
            {option === "displayPhoto" &&
                <form action="">
                    <input 
                    type="file" 
                    placeholder='Enter New Name'
                    />
                    <button type='submit'>Submit</button>
                </form>
            }
        </div>
    </aside>
  )
}
