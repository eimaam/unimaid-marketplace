import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { useUser } from '../../Context/UserContext'
import { toast } from 'react-toastify'
import { updateEmail } from 'firebase/auth'
import { auth } from '../../firebaseConfig'


export const ContactSettings = ({option, setOption, phoneNo, email}) => {
    const { user, userRef, setLoading, navigate } = useAuth()

    // state to handle new number
    const [data, setData] = useState({
        newEmail: "",
        newPhoneNumber: ""
    })

    const { newEmail, newPhoneNumber } = data

    // update phone no in firestore
    const updatePhone = async () => {
        try{
            setLoading(true)
            await updateDoc(doc(userRef, user.email), {
                phoneNo: newPhoneNumber,
            })
            toast.success('Phone Number changed')
            setLoading(false)
            return navigate('/profile')
        }
        catch(err){
            console.log(err.message)
        }
    }
    


  return (
    <aside>
        <h2>Contact Details:</h2>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Phone Number:</h4>
                    <h3>{phoneNo}</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("phoneNo")}>Change</button>
            </div>
            {option === "phoneNo" &&
                <form onSubmit={updatePhone}>
                    <input 
                    type="number" 
                    name='newNumber'
                    placeholder='Enter New Phone Number'
                    onChange={(e) => setData(prevData => ({...prevData, newPhoneNumber: e.target.value}))}
                    />
                    <button type='submit'>Submit</button>
                </form>
            }
        </div>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Contact Email:</h4>
                    <h3>{email}</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("email")}>Change</button>
            </div>
            {/* {option === "email" &&
                <form action="">
                    <input 
                    type="email" 
                    placeholder='Enter New Email'
                    onChange={(e) => setData(prevData => ({...prevData, mewEmail: e.target.value}))}
                    />
                    <button type='submit' onClick={changeEmail}>Submit</button>
                </form>
            } */}
        </div>
    </aside>
  )
}
