import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { toast } from 'react-toastify'

export const AddData = () => {
    const { loading, setLoading, user, setUser, isLogged, setIsLogged, navigate, logInWithGoogle, userRef, setError, error } = useAuth()

    const [data, setData] = useState({
        displayName: "",
        phoneNo: "",
        staysHostel: "",
        location: "",
    })

    const {displayName, phoneNo, staysHostel, location} = data

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


    // handle profile update
    const AddData = async (e) => {
        e.preventDefault()
        if(phoneNo.length < 11){
            setError('Phone number incorrect')
            return toast.error('Phone number incorect')
        }
        try{
            await updateDoc(doc(userRef, user.email), {
                displayName: displayName,
                location: location,
                phoneNo: phoneNo,
                staysHostel: staysHostel,
                isVerified: false,
                joinedOn: serverTimestamp()
            })
            toast.success("Profile Updated")
            return navigate('/profile')
        }
        catch(error){
            console.log(error.message)
        }

    }

  return (
    <div className='container' id='createAds'>
        <form onSubmit={AddData} className='container--item' style={{border: "none"}}>
            <h3>Fill the below to complete setting up your account </h3>
            <div>
                <input 
                type="text"
                name='displayName' 
                placeholder='Full Name/Brand/Business Name'
                value={displayName}
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
                <select name='staysHostel' defaultValue="Do you stay in Hostel?" onChange={handleChange}>
                    <option defaultValue="" disabled>Do you stay in Hostel?</option>
                    <option value="yes">YES</option>
                    <option value="no">NO</option>
                </select>
            </div>
            <i>
                If your answer to the above question is YES, enter your Hostel name 
                else enter area of residence or Store Location here in Maiduguri.
            </i>
            <div>
                <input 
                type="text" 
                name='location'
                value={location}
                placeholder='Area/Hostel Name or Store Location'
                onChange={handleChange}
                required
                />
            </div>
            {/* error message */}
            <i className='error'>{error}</i>
            <div>
                <input type='submit' value="Submit" />
            </div>
        </form>
    </div>
  )
}
